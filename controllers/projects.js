/**
 * GET /
 * projects page.
 */
exports.getProjects = (req, res) => {
  res.render('projects.html');
  console.log('GET: /projects');
};
