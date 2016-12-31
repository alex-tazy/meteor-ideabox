if (ideeList.find().count() === 0) {
  ideeList.insert({
    title: 'Introducing Telescope',
    idea: "une idée",
    createdAt: new Date(),
    author: "hello",
    votes: []
  });

  ideeList.insert({
    title: 'Telescope',
    idea: "une",
    createdAt: new Date(),
    author: "hello",
    votes: []
  });

  ideeList.insert({
    title: 'Introducing',
    idea: "idée",
    createdAt: new Date(),
    author: "hello",
    votes: []
  });
}