module.exports = function(app, passport) {
    app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });

    app.get('/login', function(req, res) {
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile',
        failureRedirect : '/login',
        failureFlash : true
    }));

    app.get('/news', function(req, res) {
      res.render('news.ejs');
    });

    app.get('/services', function(req, res) {
      res.render('services.ejs');
    });

    app.get('/contact', function(req, res) {
      res.render('contact.ejs');
    });

    app.post('/contact', function(req, res) {
      var Contact = require('./models/contact');
      var newMail = new Contact();
      newMail.from = req.body.name;
      newMail.subject = req.body.contactEmail;
      newMail.message = req.body.body;
      newMail.save(function(err) {
        if (err) throw err;
      });
    });

    app.get('/signup', function(req, res) {
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile',
        failureRedirect : '/signup',
        failureFlash : true
    }));

    app.get('/profile', isLoggedIn, function(req, res) {
      var Team = require('./models/team');
      var t = Team.find({}, function(err, teams) {
        if (err) throw err;
        res.render('profile.ejs', {
            user : req.user, // get the user out of session and pass to template
            teams: teams
          });
      });
    });

    app.post('/profile', function(req, res) {
      var Team = require('./models/team');
      var newTeam = new Team();
      newTeam.name = req.body.teamname;
      newTeam.rank = req.body.rank;
      newTeam.manualcapabilities = req.body.manualcapabilities;
      newTeam.autonomouscapabilities = req.body.autonomouscapabilities;
      newTeam.autonomousstrategy = req.body.autonomousstrategy;
      newTeam.endgamestrategy = req.body.endgamestrategy;
      newTeam.save(function(err) {
        if (err) throw err;
      });
      var Team = require('./models/team');
      var t = Team.find({}, function(err, teams) {
        if (err) throw err;
        res.render('profile.ejs', {
            user : req.user, // get the user out of session and pass to template
            teams: teams
          });
      });
    });

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('/sponsors', function(req, res) {
      res.render('sponsors.ejs');
    });
};

function isLoggedIn(req, res, next) {

    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
