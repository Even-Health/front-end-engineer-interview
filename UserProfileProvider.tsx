import { createContext, useContext, useEffect, useState } from 'react'

const UserProfileContext = createContext(undefined)

export const useUserProfileContext = () => useContext(UserProfileContext)

export const UserProfileProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(undefined)

  // TODO: Fetch userProfile from backend
  useEffect(() => {
    // Randomly select goal and oasis
    let randomGoal = 'BOOST_MOOD'
    let randomOasis = 'BEACH'
    const rng = Math.floor(Math.random() * 3)
    if (rng === 0) {
      randomGoal = 'REDUCE_STRESS'
      randomOasis = 'FOREST'
    } else if (rng === 1) {
      randomGoal = 'BUILD_SKILLS'
      randomOasis = 'LAKE'
    }

    setUserProfile({
      goal: randomGoal,
      minuteGoal: 5,
      minuteProgress: 3,
      oasis: randomOasis,
    })
  }, [])

  return (
    <UserProfileContext.Provider value={userProfile}>
      {children}
    </UserProfileContext.Provider>
  )
}
