const {
  fetchMyProfile,
  updateMyProfile,
  DeleteMyProfile
} = require('../service/profile.service')

const Profile = async (req, res) => {
  try {
    const { id, username } = req.user
    const response = await fetchMyProfile(id)
    if (!response) {
      throw new Error('Something went wrong')
    }
    return res.status(200).json({
      response
    })
  } catch (err) {
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

const UpdateProfile = async (req, res, next) => {
  try {
    const response = await updateMyProfile(req.user.id, req.body)
    return res.status(200).json({
      response
    })
  } catch (err) {
    next(err)
  }
}


const DeleteProfile = async (req, res, next) => {
  try {
    console.log(req.user.id)
    const result = await DeleteMyProfile(req.user.id)
    if (!result.success) {
      throw new Error('Not Found')
    }
    return res.status(200).json({
      message: result.message
    })
  } catch (err) {
    next(err)
  }
}
module.exports = { Profile, UpdateProfile, DeleteProfile }
