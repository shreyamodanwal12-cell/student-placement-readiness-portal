const healthCheck = (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Student Placement Readiness Portal Backend Running Successfully'
  })
}

module.exports = {
  healthCheck
}
