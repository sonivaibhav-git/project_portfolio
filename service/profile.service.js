const {
  findById,
  findByEmail,
  updateById,
  deleteMyId
} = require('../repositories/user.repo')

const fetchMyProfile = async (userId) => {
  try {
    const user = await findById(userId)
    if (!user) {
      throw new Error("User doesn't exist")
    }
    return {
      message: 'User found successfully',
      id: user._id,
      username: user.username,
      email: user.email,
      name: user.name,
      profilePic: user.profilePic,
      bio: user.bio,
      skills: user.skills,
      stats: {
        followers: user.followersCount,
        following: user.followingCount,
        projects: user.projectsCount
      },
      createdAt: user.createdAt,
      isPrivate:user.isPrivate
    }
  } catch (err) {
    return err
  }
}

const updateMyProfile = async (userId, updates) => {
  try {
    const user = await updateById(userId, updates)
    if(!user){
      throw new Error("User not Found")
    }
    return {
      success: true,
      message: 'Updated Profile'
    }
  } catch (err) {
    return err
  }
}

const DeleteMyProfile = async id => {
  try {
    const user = await deleteMyId(id)
    if (!user) {
      throw new Error('User not found')
    }
    return {
      success: true,
      message: 'Profile Deleted'
    }
  } catch (err) {
    return err
  }
}

module.exports = { fetchMyProfile, updateMyProfile, DeleteMyProfile }
