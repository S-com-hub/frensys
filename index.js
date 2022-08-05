const express = require('express');
const app = express();
const port = 4500;
const con = require('./Database/db');
const multer = require('multer');
var jwt = require('jsonwebtoken');
const cors = require('cors');
const fs = require('fs');
require("dotenv").config();
const bcrypt = require('bcrypt');
var bodyParser = require('body-parser');
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use(express.static(__dirname + ''));
const uploadDir = __dirname + '/images'


const storage_banner = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'banner')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + ".png")
  }
})
const upload_banner = multer({ storage: storage_banner })
const storage_catagory = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'catagory')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + ".png")
  }
})
const upload_catagory = multer({ storage: storage_catagory })
const storage_plan = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'plan')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + ".png")
  }
})
const upload_plan = multer({ storage: storage_plan })
const storage_slug = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'slug')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + ".png")
  }
})
const upload_slug = multer({ storage: storage_slug })
const storage_sub_catagory = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'sub catagory')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + ".png")
  }
})
const upload_sub_catagory = multer({ storage: storage_sub_catagory })

app.get("/del/:id", (req, res) => {
  fs.unlinkSync(uploadDir + "/" + req.params.id);
  res.send(true)
})
app.post("/register", (req, res) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);
  con.query("select * from login where username = ?", [req.body.username], (err, result) => {
    if (err) throw err;
    if (result[0] == null) {
      con.query("INSERT INTO `login`(`username`, `password`) VALUES (?,?)", [req.body.username, hash], (err, result) => {
        if (err) throw err;
        else {
          res.status(200).send(true)
        }
      })
    } else {
      res.send("Username is already exist");
    }
  })
})
app.post("/login", (req, res) => {
  con.query("select * from login where username = ?", [req.body.username], (err, result) => {
    if (err) throw err;
    if (result[0] != null) {
      const match = bcrypt.compareSync(req.body.password, result[0].password)
      if (match) {
        jwt.sign({ username: result[0].username }, process.env.ACCESS_TOKEN_SECRET, (err, token) => {
          if (err) throw err;
          else
            res.status(200).json({
              status: true,
              username: result[0].username,
              token,
            });
        }
        );
      } else {
        res.send("Username And Password is Wrong!");
      }
    } else {
      res.send("Username is not exist");
    }
  })
})
app.get("/activity_maping1", (req, res) => {
  con.query("SELECT * FROM `activity_maping`", (error, result) => {
    if (result) {
      res.status(200).send(result);
    } else {
      res.sendStatus(403);
    }
  });
});
app.post("/activity_maping", verifytoken, (req, res) => {
  jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET, (err, auth) => {
    if (err) {
      res.sendStatus(403);
     } 
    else {
       if (auth.username != req.body.username) {
         res.sendStatus(403);
    }
       else {
        con.query("select * from activity_maping where activity_name=?", [req.body.name], (err, result) => {
          if (err) throw err;
          if (result[0] == null) {
            con.query("INSERT INTO `activity_maping`(`activity_name`, `active_url`,`is_active`,`show_manu`) VALUES (?,?,?,?)", [req.body.name, req.body.url,req.body.is,req.body.manu], (err, result) => {
              if (err) throw err;
              else {
                res.status(200).send(true);
              }
            })
          } else {
            res.send("Display name is already exist");
          }
        })
      }
    }
  });
})





app.post("/get-menu", verifytoken, (req, res) => {
  jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET, (err, auth) => {
    if (err) {
      res.sendStatus(403);
    } else {
      if (auth.username != req.body.username) {
        res.status(403).send(false);
      } else {

        con.query("SELECT * FROM `module`", (err, result) => {
          if (err) throw err;
          else {
            res.status(200).send({ data: result });
          }
        })
      }
    }
  });
})
app.post("/add-role", verifytoken, (req, res) => {
  jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET, (err, auth) => {
    if (err) {
      res.sendStatus(403);
    } else {
      if (auth.username != req.body.username) {
        res.status(403).send(false);
      } else {
        con.query("select * from role where display_name=?", [req.body.display_name], (err, result) => {
          if (err) throw err;
          if (result[0] == null) {
            con.query("INSERT INTO `role`(`name`, `display_name`) VALUES (?,?)", [req.body.name, req.body.display_name], (err, result) => {
              if (err) throw err;
              else {
                res.status(200).send(true);
              }
            })
          } else {
            res.send("Display name is already exist");
          }
        })
      }
    }
  });
})



app.post("/add-catagory", upload_catagory.single('add_cat'), verifytoken, (req, res) => {
  jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET, (err, auth) => {
    if (err) {
      res.sendStatus(403);
    } else {
      if (auth.username != req.body.username) {
        res.status(403).send(false);
      } else {
        con.query("SELECT * FROM `catagory` WHERE name=?", [req.body.catagory_name], (err, result) => {
          if (err) throw err;
          if (result[0] == null) {
            con.query("INSERT INTO `catagory`(`name`,`image`,`status`) VALUES (?,?,?)", [req.body.catagory_name, req.file.filename, 'Y'], (err, result) => {
              if (err) throw err;
              if (result) {
                res.status(200).send(true)
              }
            })
          } else {
            res.status(404).send("Catagory Name is already exist");
          }
        })
      }
    }
  })
})
app.post("/get-catagory", verifytoken, (req, res) => {
  jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET, (err, auth) => {
    if (err) {
      res.sendStatus(403);
    } else {
      if (auth.username != req.body.username) {
        res.status(403).send(false);
      } else {
        con.query("select * from catagory", (err, result) => {
          if (err) throw err;
          else {
            res.status(200).send(result);
          }
        })
      }
    }
  })
})
app.post("/del-catagory", verifytoken, (req, res) => {
  jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET, (err, auth) => {
    if (err) {
      res.sendStatus(403);
    } else {
      if (auth.username != req.body.username) {
        res.status(403).send(false);
      } else {
        con.query("DELETE FROM catagory where id=?", [req.body.id], (err, result) => {
          if (err) throw err;
          else {
            res.status(200).send(true);
          }
        })
      }
    }
  })
})
app.post("/status-catagory", verifytoken, (req, res) => {
  jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET, (err, auth) => {
    if (err) {
      res.sendStatus(403);
    } else {
      if (auth.username != req.body.username) {
        res.status(403).send(false);
      } else {
        con.query("UPDATE `catagory` SET `status`= ? WHERE `id`=?", [req.body.status, req.body.id], (err, result) => {
          if (err) throw err;
          else {
            res.status(200).send(true);
          }
        })
      }
    }
  })
})
app.post("/get-catagory-id", verifytoken, (req, res) => {
  jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET, (err, auth) => {
    if (err) {
      res.sendStatus(403);
    } else {
      if (auth.username != req.body.username) {
        res.status(403).send(false);
      } else {
        con.query("select * from catagory where `id`=?", [req.body.id], (err, result) => {
          if (err) throw err;
          else {
            res.status(200).send(result);
          }
        })
      }
    }
  })
})
app.post("/update-catagory", upload_catagory.single('update_cat'), verifytoken, (req, res) => {
  console.log("step 1");
  jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET, (err, auth) => {
    if (err) {
      res.sendStatus(403);
    } else {
      if (auth.username != req.body.username) {
        res.status(403).send(false);
      } else {
        console.log("step 2");
        con.query("SELECT * FROM `catagory` WHERE name=?", [req.body.catagory_name], (err, result) => {
          if (err) throw err;
          if (result[0] == null) {
            console.log("step 3");
            if (req.file == undefined) {
              console.log("step 4");
              con.query("UPDATE `catagory` SET `name`= ? WHERE `id`=?", [req.body.catagory_name, req.body.id], (err, result) => {
                if (err) throw err;
                if (result) {
                  console.log("step 5");
                  res.status(200).send(true)
                }
              })
            } else {
              console.log("step 6");
              con.query("UPDATE `catagory` SET `name`= ?,`image`= ? WHERE `id`=?", [req.body.catagory_name, req.file.filename, req.body.id], (err, result) => {
                if (err) throw err;
                if (result) {
                  fs.unlinkSync(uploadDir + "/" + req.body.old_image_name);
                  res.status(200).send(true)
                }
              })
            }
          } else {
            console.log("step 7");
            res.status(404).send("Catagory Name is already exist");
          }
        })
      }
    }
  })
})


app.post("/add-sub-catagory", upload_sub_catagory.single('add_sub_cat'), verifytoken, (req, res) => {
  jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET, (err, auth) => {
    if (err) {
      res.sendStatus(403);
    } else {
      if (auth.username != req.body.username) {
        res.status(403).send(false);
      } else {
        con.query("SELECT * FROM `sub-catagory` WHERE name=?", [req.body.catagory_name], (err, result) => {
          if (err) throw err;
          if (result[0] == null) {
            con.query("INSERT INTO `sub-catagory`(`image`, `name`,`status`) VALUES (?,?,?)", [req.file.filename, req.body.catagory_name, 'Y'], (err, result) => {
              if (err) throw err;
              if (result) {
                res.status(200).json({
                  status: true,
                  fileName: req.file.filename,
                  path: req.file.path
                })
              }
            })
          } else {
            res.status(404).send("Catagory Name is already exist");
          }
        })
      }
    }
  })
})
app.post("/get-sub-catagory", verifytoken, (req, res) => {
  jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET, (err, auth) => {
    if (err) {
      res.sendStatus(403);
    } else {
      if (auth.username != req.body.username) {
        res.status(403).send("false");
      } else {

        con.query("select * from `sub-catagory`", (err, result) => {
          if (err) throw err;
          else {

            res.status(200).send({ data: result });
          }
        })
      }
    }
  });
})
app.post("/del-sub-catagory", verifytoken, (req, res) => {
  jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET, (err, auth) => {
    if (err) {
      res.sendStatus(403);
    } else {
      if (auth.username != req.body.username) {
        res.status(403).send(false);
      } else {
        con.query("DELETE FROM `sub-catagory` where id=?", [req.body.id], (err, result) => {
          if (err) throw err;
          else {
            res.status(200).send(true);
          }
        })
      }
    }
  })
})
app.post("/status-sub-catagory", verifytoken, (req, res) => {
  jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET, (err, auth) => {
    if (err) {
      res.sendStatus(403);
    } else {
      if (auth.username != req.body.username) {
        res.status(403).send(false);
      } else {
        con.query("UPDATE `sub-catagory` SET `status`= ? WHERE `id`=?", [req.body.status, req.body.id], (err, result) => {
          if (err) throw err;
          else {
            res.status(200).send(true);
          }
        })
      }
    }
  })
})


app.post("/add-slug", upload_slug.single('add_slug'), verifytoken, (req, res) => {
  jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET, (err, auth) => {
    if (err) {
      res.sendStatus(403);
    } else {
      if (auth.username != req.body.username) {
        res.status(403).send(false);
      } else {
        con.query("SELECT * FROM `slug` WHERE slug=?", [req.body.slug_name], (err, result) => {
          if (err) throw err;
          if (result[0] == null) {
            con.query("INSERT INTO `slug`(`image`, `slug`, `status`) VALUES (?,?,?)", [req.file.filename, req.body.slug_name, 'Y'], (err, result) => {
              if (err) throw err;
              if (result) {
                res.status(200).json({
                  status: true,
                  fileName: req.file.filename,
                  path: req.file.path
                })
              }
            })
          } else {
            res.status(404).send("Slug Name is already exist");
          }
        })
      }
    }
  })
})
app.post("/get-slug", verifytoken, (req, res) => {
  jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET, (err, auth) => {
    if (err) {
      res.sendStatus(403);
    } else {
      if (auth.username != req.body.username) {
        res.status(403).send("false");
      } else {
        con.query("select * from `slug`", (err, result) => {
          if (err) throw err;
          else {
            res.status(200).send({ data: result });
          }
        })
      }
    }
  });
})
app.post("/del-slug", verifytoken, (req, res) => {
  jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET, (err, auth) => {
    if (err) {
      res.sendStatus(403);
    } else {
      if (auth.username != req.body.username) {
        res.status(403).send(false);
      } else {
        con.query("DELETE FROM `slug` where id=?", [req.body.id], (err, result) => {
          if (err) throw err;
          else {
            res.status(200).send(true);
          }
        })
      }
    }
  })
})
app.post("/status-slug", verifytoken, (req, res) => {
  jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET, (err, auth) => {
    if (err) {
      res.sendStatus(403);
    } else {
      if (auth.username != req.body.username) {
        res.status(403).send(false);
      } else {
        con.query("UPDATE `slug` SET `status`= ? WHERE `id`=?", [req.body.status, req.body.id], (err, result) => {
          if (err) throw err;
          else {
            res.status(200).send(true);
          }
        })
      }
    }
  })
})


app.post("/add-plan", upload_plan.single('Add_plan_img'), verifytoken, (req, res) => {
  jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET, (err, auth) => {
    if (err) {
      res.sendStatus(403);
    } else {
      if (auth.username != req.body.username) {
        res.status(403).send(false);
      } else {
        con.query("SELECT * FROM `plan` WHERE name=?", [req.body.plan_name], (err, result) => {
          if (err) throw err;
          if (result[0] == null) {
            con.query("INSERT INTO `plan`(`name`, `from`, `to`, `real_price`, `offer_price`, `total_download`, `image`,`status`) VALUES (?,?,?,?,?,?,?,?)", [req.body.plan_name, req.body.from_date, req.body.to_date, req.body.real_price, req.body.offer_price, req.body.totaldownload, req.file.filename, 'Y'], (err, result) => {
              if (err) throw err;
              if (result) {
                res.status(200).json({
                  status: true,
                  fileName: req.file.filename,
                  path: req.file.path
                })
              }
            })
          } else {
            res.status(404).send("plan  Name is already exist");
          }
        })
      }
    }
  })
})
app.post("/get-plan", verifytoken, (req, res) => {
  jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET, (err, auth) => {
    if (err) {
      res.sendStatus(403);
    } else {
      if (auth.username != req.body.username) {
        res.status(403).send("false");
      } else {
        con.query("select * from `plan`", (err, result) => {
          if (err) throw err;
          else {
            res.status(200).send({ data: result });
          }
        })
      }
    }
  });
})
app.post("/del-plan", verifytoken, (req, res) => {
  jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET, (err, auth) => {
    if (err) {
      res.sendStatus(403);
    } else {
      if (auth.username != req.body.username) {
        res.status(403).send(false);
      } else {
        con.query("DELETE FROM `plan` where id=?", [req.body.id], (err, result) => {
          if (err) throw err;
          else {
            res.status(200).send(true);
          }
        })
      }
    }
  })
})
app.post("/status-plan", verifytoken, (req, res) => {
  jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET, (err, auth) => {
    if (err) {
      res.sendStatus(403);
    } else {
      if (auth.username != req.body.username) {
        res.status(403).send(false);
      } else {
        con.query("UPDATE `plan` SET `status`= ? WHERE `id`=?", [req.body.status, req.body.id], (err, result) => {
          if (err) throw err;
          else {
            res.status(200).send(true);
          }
        })
      }
    }
  })
})


app.post("/get-sub-cat-mapping", verifytoken, (req, res) => {
  jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET, (err, auth) => {
    if (err) {
      res.sendStatus(403);
    } else {
      if (auth.username != req.body.username) {
        res.status(403).send("false");
      } else {
        con.query("select * from `sub-cat-mapping`", (err, result) => {
          if (err) throw err;
          else {
            res.status(200).send({ data: result });
          }
        })
      }
    }
  });
})
app.post("/add-sub-cat-mapping", verifytoken, (req, res) => {
  jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET, (err, auth) => {
    if (err) {
      res.sendStatus(403);
    } else {
      if (auth.username != req.body.username) {
        res.status(403).send(false);
      } else {
        con.query("INSERT INTO `sub-cat-mapping`(`cat_name`, `sub_cat_name`, `status`) VALUES (?,?,?)", [req.body.cat_name, req.body.cat_sub_name, 'Y'], (err, result) => {
          if (err) throw err;
          if (result) {
            res.status(200).send(true)
          }
        })
      }
    }
  })
})
app.post("/del-sub-cat-mapping", verifytoken, (req, res) => {
  jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET, (err, auth) => {
    if (err) {
      res.sendStatus(403);
    } else {
      if (auth.username != req.body.username) {
        res.status(403).send(false);
      } else {
        con.query("DELETE FROM `sub-cat-mapping` where id=?", [req.body.id], (err, result) => {
          if (err) throw err;
          else {
            res.status(200).send(true);
          }
        })
      }
    }
  })
})
app.post("/status-sub-cat-mapping", verifytoken, (req, res) => {
  jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET, (err, auth) => {
    if (err) {
      res.sendStatus(403);
    } else {
      if (auth.username != req.body.username) {
        res.status(403).send(false);
      } else {
        con.query("UPDATE `sub-cat-mapping` SET `status`= ? WHERE `id`=?", [req.body.status, req.body.id], (err, result) => {
          if (err) throw err;
          else {
            res.status(200).send(true);
          }
        })
      }
    }
  })
})


app.post("/add-slug-mapping", verifytoken, (req, res) => {
  jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET, (err, auth) => {
    if (err) {
      res.sendStatus(403);
    } else {
      if (auth.username != req.body.username) {
        res.status(403).send(false);
      } else {
        con.query("INSERT INTO `slug_mapping`(`sugId`, `catId`, `subcatId`, `status`) VALUES (?,?,?,?)", [req.body.slug_name, req.body.cat_name, req.body.sub_cat_name, 'Y'], (err, result) => {
          if (err) throw err;
          if (result) {
            res.status(200).send(true)
          }
        })
      }
    }
  })
})
app.post("/status-slug_mapping", verifytoken, (req, res) => {
  jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET, (err, auth) => {
    if (err) {
      res.sendStatus(403);
    } else {
      if (auth.username != req.body.username) {
        res.status(403).send(false);
      } else {
        con.query("UPDATE `slug_mapping` SET `status`= ? WHERE `id`=?", [req.body.status, req.body.id], (err, result) => {
          if (err) throw err;
          else {
            res.status(200).send(true);
          }
        })
      }
    }
  })
})


app.post("/add-banner", upload_banner.single('add_banner'), verifytoken, (req, res) => {
  jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET, (err, auth) => {
    if (err) {
      res.sendStatus(403);
    } else {
      if (auth.username != req.body.username) {
        res.status(403).send(false);
      } else {
        con.query("SELECT * FROM `banner` WHERE name=?", [req.body.name], (err, result) => {
          if (err) throw err;
          if (result[0] == null) {
            con.query("INSERT INTO `banner`( `name`, `type`, `image`, `status`) VALUES (?,?,?,?)", [req.body.name, req.body.type, req.file.filename, 'Y'], (err, result) => {
              if (err) throw err;
              if (result) {
                res.status(200).json({
                  status: true,
                  fileName: req.file.filename,
                  path: req.file.path
                })
              }
            })
          } else {
            res.status(404).send("Banner Name is already exist");
          }
        })
      }
    }
  })
})
app.post("/get-banner", verifytoken, (req, res) => {
  jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET, (err, auth) => {
    if (err) {
      res.sendStatus(403);
    } else {
      if (auth.username != req.body.username) {
        res.status(403).send("false");
      } else {
        con.query("select * from `banner`", (err, result) => {
          if (err) throw err;
          else {
            res.status(200).send({ data: result });
          }
        })
      }
    }
  });
})
app.post("/del-banner", verifytoken, (req, res) => {
  jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET, (err, auth) => {
    if (err) {
      res.sendStatus(403);
    } else {
      if (auth.username != req.body.username) {
        res.status(403).send(false);
      } else {
        con.query("DELETE FROM `banner` where id=?", [req.body.id], (err, result) => {
          if (err) throw err;
          else {
            res.status(200).send(true);
          }
        })
      }
    }
  })
})
app.post("/status-banner", verifytoken, (req, res) => {
  jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET, (err, auth) => {
    if (err) {

      res.sendStatus(403);
    } else {
      if (auth.username != req.body.username) {
        res.status(403).send(false);
      } else {
        con.query("UPDATE `banner` SET `status`= ? WHERE `id`=?", [req.body.status, req.body.id], (err, result) => {
          if (err) throw err;
          else {
            res.status(200).send(true);
          }
        })
      }
    }
  })
})


app.post("/add-module", verifytoken, (req, res) => {
  jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET, (err, auth) => {
    if (err) {
      res.sendStatus(403);
    } else {
      if (auth.username != req.body.username) {
        res.status(403).send(false);
      } else {
        con.query("select * from module where module_name=?", [req.body.module_name], (err, result) => {
          if (err) throw err;
          if (result[0] == null) {
            con.query("INSERT INTO `module`(`url`, `module_name`,`role_name`) VALUES (?,?,?)", [req.body.url, req.body.module_name, 'req.body.role_name'], (err, result) => {
              if (err) throw err;
              else {
                res.status(200).send(true);
              }
            })
          } else {
            res.send("Module name is already exist");
          }
        })
      }
    }
  });
})
app.post("/get-module", verifytoken, (req, res) => {
  jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET, (err, auth) => {
    if (err) {
      res.sendStatus(403);
    } else {
      if (auth.username != req.body.username) {
        res.status(403).send("false");
      } else {
        con.query("select * from `module`", (err, result) => {
          if (err) throw err;
          else {
            res.status(200).send({ data: result });
          }
        })
      }
    }
  });
})

app.listen(port, () => {
  console.log('port : ' + port);
})

function verifytoken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}