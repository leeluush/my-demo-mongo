
app.get('/api/get-all-blogs', async (req, res) => {

    try {
      const blogs = await blog.find({})
      res.json({ blogs })
    } catch (error) {
      res.send(error)
    }
  })
  
  
  
  app.get('/api/blogs/:blogId', async (req, res) => {
  
    try {
      const blogs = await Blog.find({
      _id :req.params.blogId}).exec()
      res.send({ blogs })
    } catch (error) {
      res.send(error)
    }
  })
  
  
  //create todo
  
  
  app.get('/api/new', async (req, res) => {
    const blog = new blogs();
    todo.task = "my new task form node";
    todo.isDone = false;
    todo.user = "lee";
    try {
      await todo.save();
  
      res.send('created!')
    } catch (error) {
      res.send(error)
    }
  
  })
  
  
  
  // deletes all to dos 
  
  app.get('/api/delete-all', async (req, res) => {
    try {
      await Todo.deleteMany({ user: 'lee' });
      res.send('removed')
    } catch (error) {
      res.send(error)
    }
  
  })
  
  // delete one to do 
  
  app.get('/api/delete-one', async (req, res) => {
    try {
      await Todo.deleteOne({ user: 'lee' });
      res.send('removed')
    } catch (error) {
      res.send(error)
    }
  
  })
  
  
  app.get('/api/update', async (req, res) => {
    try {
      await Todo.updateOne({ _id: isObjectId("")},{$set: {task: String} })
        res.send('updated')
      } catch (error) {
        res.send(error)
      }
    });