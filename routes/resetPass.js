const express      = require("express"),
      router       = express.Router(),
      bcrypt       = require("bcryptjs"),
      crypto       = require("crypto"),
      async        = require("async"),
      User         = require("../models/user"),
      email        = require("./auth/email");

//ROUTE FOR SENDING MAIL WITH RESET PASSWORD LINK
router.post("/forgot", (req, res, next) => {
  async.waterfall(
    [
      function(done) {
        crypto.randomBytes(20, (err, buf) => {
          var token = buf.toString("hex");
          done(err, token);
        });
      },
      function(token, done) {
        User.findOne({ email: req.body.email }, (err, user) => {
          if (!user) {
            return res.status(200).send({
                error:"error",
                message:"No account with that email address exists", 
                to:"forgot"
            });
          } 
          user.resetPasswordToken = token;
          user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
          user.save(function(err) {
            done(err, token, user);
          });
        });
      },
      function(token, user, done) {
        let err = email(
          user.email,
          "Password Reset",
          "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
            "Please click on the following link, or paste this into your browser to complete the process:\n\n" +
            "http://" +
            req.headers.host +
            "/resetpas/" +
            token +
            "\n\n" +
            "If you did not request this, please ignore this email and your password will remain unchanged.\n"
        );
        req.flash(
          "success",
          "An e-mail has been sent to " +
            user.email +
            " with further instructions."
        );
        done(err, "done");
      }
    ],
    function(err) {
      if (err) return next(err);
      res.redirect("/forgot");
    }
  );
});

//SHOW FORM FOR CHANGING PASSWORD
router.get("/resetpas/:token", (req, res) => {
  User.findOne(
    {
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() }
    },
    (err, user) => {
      if (!user) {
        req.flash("error", "Password reset token is invalid or has expired.");
        return res.redirect("/forgot");
      }
      res.render("resetpas", { token: req.params.token });
    }
  );
});

//RESET PASSWORD
router.post("/resetpas/:token", (req, res) => {
  async.waterfall(
    [
      function(done) {
        User.findOne(
          {
            resetPasswordToken: req.params.token,
            resetPasswordExpires: { $gt: Date.now() }
          },
          (err, user) => {
            if (!user) {
              req.flash(
                "error",
                "Password reset token is invalid or has expired."
              );
              return res.redirect("back");
            } else if (req.body.password === req.body.confirm) {
              bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(req.body.password, salt, (err, hash) => {
                  user.password = hash;
                  user.resetPasswordToken = undefined;
                  user.resetPasswordExpires = undefined;
                  user.save();
                  done(err, user);
                });
              });
            } else {
              req.flash("error", "Passwords do not match.");
              return res.redirect("back");
            }
          }
        );
      },
      function(user, done) {
        let err = email(
          user.email,
          "Your password has been changed",
          "Hello,\n\n" +
            "This is a confirmation that the password for your account " +
            user.email +
            " has just been changed.\n"
        );
        req.flash("success", "Your password has been changed.");
        done(err);
      }
    ],
    function(err) {
      if (err) return next(err);
      res.redirect("/login");
    }
  );
});

module.exports = router;
