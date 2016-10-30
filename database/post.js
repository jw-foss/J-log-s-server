var mongodb = require('./db');

function Post(title, date, content, author, code) {
  this.title = title,
    this.date = date,
    this.content = content,
    this.author = author,
    this.code = code;
}

module.exports = Post;
// define the save function 
Post.prototype.save = function (cb) {
  var time = new Date();
  var post = {
    title: this.title,
    date: this.date,
    content: this.content,
    author: this.author,
    code: this.code,
    time: time
  };
  mongodb.open(function (err, db) {
    if (err) {
      return cb(err);
    }
    //make a collection
    db.collection('posts', function (err, collection) {
      if (err) {
        mongodb.close();
        return cb(err);
      }
      collection.insert(post, {
        safe: true
      }, function (err) {
        mongodb.close();
        if (err) {
          return cb(err);
        }
        cb(null);
      });
    });
  });
};
//define getAll function 
Post.getAll = function (name, cb) {
  mongodb.open(function (err, db) {
    if (err) {
      return cb(err)
    }
    db.collection('posts', function (err, collection) {
      if (err) {
        mongodb.close();
        return cb(err);
      }
      var query = {};
      if (name) {
        query.name = name;
      }
      collection.find(query).sort({
        time: -1
      }).toArray(function (err, docs) {
        mongodb.close();
        if (err) {
          return cb(err);
        }
        cb(null, docs);
      });
    });
  });
};

//define getOne function 
Post.getOne = function (title, date, content, cb) {
  mongodb.open(function (err, db) {
    if (err) {
      return cb(err);
    }
    db.collection('posts', function (err, collection) {
      if (err) {
        return cb(err);
      }
      collection.findOne({
        "title": title,
        "date": date,
        "content": content
      }, function (err, doc) {
        mongodb.close();
        if (err) {
          return cb(err);
        }
        cb(null, doc);
      });
    });
  });
};

Post.edit = function (title, date, content, cb) {
  mongodb.open(function (err, db) {
    if (err) {
      return cb(err);
    }
    db.collection('posts', function (err, collection) {
      if (err) {
        return cb(err);
      }
      collection.findOne({
        "title": title,
        "date": date,
        "content": content
      }, function (err, doc) {
        mongodb.close();
        if (err) {
          return cb(err);
        }
        callback(null, doc);
      });
    });
  });
};

// define the update function 
Post.update = function (title, date, content, cb) {
  //open database
  mongodb.open(function (err, db) {
    if (err) {
      return cb(err);
    }
    //go to collection posts
    db.collection('posts', function (err, collection) {
      if (err) {
        mongodb.close();
        return cb(err);
      }
      collection.update({
        "title": title,
        "date": date
      }, {
          $set: { content: content }
        }, function (err) {
          mongodb.close();
          if (err) {
            return cb(err);
          }
          cb(null);
        });;
    });
  });
};

//define remove function 

Post.remove = function (title, date, content, cb) {
  mongodb.open(function (err, db) {
    if (err) {
      return cb(err);
    }
    db.collection('posts', function (err, collection) {
      if (err) {
        return cb(err);
      }
      collection.remove({
        "title": title,
        "date": date,
        "content": content
      }, {
          w: 1
        }, function (err) {
          mongodb.close();
          if (err) {
            return cb(err);
          }
          cb(null);
        });
    });
  });
};