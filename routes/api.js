'use strict';

const mongoose = require('mongoose');
const multer = require("multer");

module.exports = function (app) {
  const upload = multer();

  const issueSchema = new mongoose.Schema({
    assigned_to: { type: String, default: "" },
    status_text: { type: String, default: "" },
    open: {type: Boolean, default: true},
    issue_title: String,
    issue_text: String,
    created_by: String,
    created_on: Date,
    updated_on: Date
  });

  const projectSchema = new mongoose.Schema({
    name: String,
    issues: [issueSchema]
  });



  const Issue = mongoose.model('Issue', issueSchema);
  const Project = mongoose.model('Project', projectSchema);

  app.route('/api/issues/:project')

    .get(function (req, res) {
      let projectName = req.params.project;
      const issue_title = req.query.issue_title;
      const issue_text = req.query.issue_text;
      const created_by = req.query.created_by;
      const assigned_to = req.query.assigned_to;
      const status_text = req.query.status_text;
      const _id = req.query._id;
      const created_on = req.query.created_on;
      const updated_on = req.query.updated_on;
      Project.findOne({ name: projectName }, function (err, proj) {
        if (err) {
          return console.error(err);
        } else {
          if (proj) {
            let result = proj.issues;
            if(issue_title){
              result = proj.issues.filter((issue) => {
                return issue.issue_title == issue_title;
              })
            }
            if(issue_text){
              result = proj.issues.filter((issue) => {
                return issue.issue_text == issue_text;
              })
            }
            if(created_by){
              result = proj.issues.filter((issue) => {
                return issue.created_by == created_by;
              })
            }
            if(assigned_to){
              result = proj.issues.filter((issue) => {
                return issue.assigned_to == assigned_to;
              })
            }
            if(status_text){
              result = proj.issues.filter((issue) => {
                return issue.status_text == status_text;
              })
            }
            if(_id){
              result = proj.issues.filter((issue) => {
                return issue._id == _id;
              })
            }
            if(created_on){
              result = proj.issues.filter((issue) => {
                return issue.created_on == created_on;
              })
            }
            if(updated_on){
              result = proj.issues.filter((issue) => {
                return issue.updated_on == updated_on;
              })
            }
            return res.json(result);
          } else {
            return res.json({ error: 'Project does not exist.' })
          }
        }
      })
    })

    .post(upload.none(), function (req, res) {
      const projectName = req.params.project;
      const issue_title = req.body.issue_title;
      const issue_text = req.body.issue_text;
      const created_by = req.body.created_by;
      const assigned_to = req.body.assigned_to;
      const status_text = req.body.status_text;
      const currentTime = new Date();
      if (!issue_title || !issue_text || !created_by) {
        return res.json({ error: 'required field(s) missing' })
      }
      Project.findOne({ name: projectName }, function (err, project) {
        if (err) {
          return res.json({ error: 'There was an error with the provided project name.' })
        } else if (project) {
          //the project exists
          //add new issue to project
          console.log('existing project');
          const newIssue = new Issue({
            assigned_to: assigned_to,
            status_text: status_text,
            open: true,
            issue_title: issue_title,
            issue_text: issue_text,
            created_by: created_by,
            created_on: currentTime,
            updated_on: currentTime
          });
          newIssue.save(function (err, issue) {
            if (err) {
              return console.error(err);
            } else {
              project.issues.push(issue);
              project.save(function (err, data) {
                if (err) {
                  return console.error(err);
                } else {
                  return res.json({
                    assigned_to: issue.assigned_to,
                    status_text: issue.status_text,
                    open: issue.open,
                    _id: issue._id,
                    issue_title: issue.issue_title,
                    issue_text: issue.issue_text,
                    created_by: issue.created_by,
                    created_on: issue.created_on,
                    updated_on: issue.updated_on
                  });
                }
              });
            }
          });
        } else {
          //create a project
          //add new issue
          console.log('new project');
          const newProject = new Project({ name: projectName });
          const newIssue = new Issue({
            assigned_to: assigned_to,
            status_text: status_text,
            open: true,
            issue_title: issue_title,
            issue_text: issue_text,
            created_by: created_by,
            created_on: currentTime,
            updated_on: currentTime
          });
          newIssue.save(function (err, issue) {
            if (err) {
              return console.error(err)
            } else {
              newProject.issues.push(issue);
              newProject.save(function (err, proj) {
                if (err) {
                  return console.error(err);
                } else {
                  return res.json({
                    assigned_to: issue.assigned_to,
                    status_text: issue.status_text,
                    open: issue.open,
                    _id: issue._id,
                    issue_title: issue.issue_title,
                    issue_text: issue.issue_text,
                    created_by: issue.created_by,
                    created_on: issue.created_on,
                    updated_on: issue.updated_on
                  });
                }
              })
            }
          });
        }
      });
    })

    .put(upload.none(), function (req, res) {
      const projectName = req.params.project;
      const _id = req.body._id;         
      if(!_id){
        return res.json({error: 'missing _id'});
      }
      const issue_title = req.body.issue_title;
      const issue_text = req.body.issue_text;
      const assigned_to = req.body.assigned_to;
      const status_text = req.body.status_text;
      const created_by = req.body.created_by;
      const open = req.body.open;
      if(!issue_title && !issue_text && !assigned_to && !status_text){
        return res.json({ error: 'no update field(s) sent', '_id': _id });
      }
      const currentTime = new Date();
      let update = {};
      update['issues.$.updated_on'] = currentTime;   
      if(issue_title){
        update['issues.$.issue_title'] = issue_title;
      }
      if(issue_text){
        update['issues.$.issue_text'] = issue_text;
      }
      if(assigned_to){
        update['issues.$.assigned_to'] = assigned_to;
      }
      if(status_text){
        update['issues.$.status_text'] = status_text;
      }
      if(created_by){
        update['issues.$.created_by'] = created_by;
      }
      if(open){
        update['issues.$.open'] = open;
      }
      Project.findOneAndUpdate({name: projectName, 'issues._id': _id}, {$set: update}, function (err, proj) {
        if(err){
          return console.error(err);
        } else if (proj) {
          return res.json({result: 'successfully updated', _id: _id});
          /*
          Issue.findByIdAndUpdate(_id, update, {new: true}, function (err, issue) {
            if(err){
              return console.error(err);
            } else if(issue){
              return res.json({result: 'successfully updated', _id: issue._id});
            } else {
              return res.json({error: 'could not update', _id: _id});
            }
          })
          */
        } else {
          return res.json({error: 'could not update', _id: _id});
        }
      });
  })

    .delete(upload.none(), function (req, res) {
      const projectName = req.params.project;
      const _id = req.body._id;
      if(!_id){
        return res.json({error: 'missing _id'});
      }
      Project.findOne({name: projectName, 'issues._id': _id}, function (err, proj) {
        if(err){
          return console.error(err);
        } else if (proj) {
          Issue.findByIdAndDelete(_id, function (err, deleted) {
            if(err){
              return console.error(err);
            } else if(deleted) {
              return res.json({result: 'successfully deleted', _id: _id});
            } else {
              return res.json({error: 'could not delete', _id: _id});
            }
          })
        } else {
          return res.json({error: 'could not delete', _id: _id});
        }      
    });
  });
  

};
