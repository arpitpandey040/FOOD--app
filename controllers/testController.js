const testUserController = (req, res) => {
  try {
    res.status(200).send({
      success: true,
      message: "Router is working fine.",
    });
  } catch (error) {
    console.log(`Error in API ${error}`);
  }
};

module.exports = { testUserController };
