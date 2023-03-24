import axios from 'axios'
import { createContext, useContext } from 'react'
import Configuration from '../services/ConfigurationService'
import { useAuthContext } from './AuthProvider'

const CabanaApiContext = createContext({
  AccountApi: undefined,
  ChatApi: undefined,
  PersonalizationApi: undefined,
  RoomApi: undefined,
  TestApi: undefined,
  UserApi: undefined,
})

export const useCabanaApi = () => useContext(CabanaApiContext)

export const CabanaApiProvider = ({ children }) => {
  const { user } = useAuthContext()
  const CabanaApi = axios.create({
    baseURL: Configuration.CABANA_SERVICE_REST_URL,
  })
  CabanaApi.interceptors.request.use((config) => {
    config.headers.Authorization = user?.token
    return config
  })
  CabanaApi.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      console.log(error)
      return Promise.reject(error.response.data.error)
    }
  )

  const ChatApi = {
    getMessages: (chatId: string) =>
      CabanaApi.get(`/chat/${chatId}/messages`).then(
        (response) => response.data.messages
      ),
    sendMessage: (chatId: string, message: string) =>
      CabanaApi.post(`/chat/${chatId}/message`, { message }),
  }

  const RoomApi = {
    changeAlias: (roomId: string, alias: string) =>
      CabanaApi.post(`/room/${roomId}/alias`, { alias }),
    getRoster: (roomId: string) =>
      CabanaApi.get(`/roster/${roomId}`).then((response) => response.data),
    join: (roomId: string) => CabanaApi.post(`/room/${roomId}/join`),
    end: (roomId: string) => CabanaApi.post(`/room/${roomId}/end-group`),
    start: (roomId: string) => CabanaApi.post(`/room/${roomId}/start`),
    leave: (roomId: string) => CabanaApi.post(`/room/${roomId}/leave`),
    toggleMicrophone: (roomId: string) =>
      CabanaApi.post(`/room/${roomId}/toggle-microphone`),
    toggleCamera: (roomId: string) =>
      CabanaApi.post(`/room/${roomId}/toggle-camera`),
    toggleHandRaised: (roomId: string) =>
      CabanaApi.post(`/room/${roomId}/toggle-hand-raised`),
    toggleScreen: (roomId: string) =>
      CabanaApi.post(`/room/${roomId}/toggle-screenshare`),
    muteParticipant: (roomId: string, userId: string) => {
      CabanaApi.post(`/room/${roomId}/mute-participant`, { userId })
    },
    setActiveSpeaker: (roomId: string, value: boolean) => {
      const endpoint = value ? 'set-active-speaker' : 'clear-active-speaker'
      CabanaApi.post(`/room/${roomId}/${endpoint}`)
    },
    submitModeratorFeedback: (roomId: string, feedback) => {
      CabanaApi.post(`/room/${roomId}/moderator/submit-feedback`, feedback)
    },
    submitParticipantFeedback: (roomId: string, feedback) => {
      CabanaApi.post(`/room/${roomId}/participant/submit-feedback`, feedback)
    },
  }

  const PersonalizationApi = {
    selectGoal: (goal: String, customGoal: String) =>
      CabanaApi.post(`/userprofile/personalization/goal`, {
        goal,
        customGoal: customGoal ? customGoal.trim() : null,
      }),
    selectMinutes: (minutes) =>
      CabanaApi.post(`/userprofile/personalization/minutes`, { minutes }),
    selectOasis: (oasis) =>
      CabanaApi.post(`/userprofile/personalization/oasis`, { oasis }),
    selectProfessionalRole: (professionalRoles) =>
      CabanaApi.post(`/userprofile/personalization/professional-role`, {
        professionalRoles,
      }),
  }

  const UserApi = {
    profile: () =>
      CabanaApi.get('/userprofile').then((response) => response.data),
  }

  const TestApi = {
    getRoomList: () =>
      CabanaApi.get(`/testing/room-list`).then((response) => response.data),
    createRoom: (data) => CabanaApi.post('/testing/create-room', data),
    unregister: (roomId, userId) =>
      CabanaApi.post('/testing/unregister', {
        roomId: { value: roomId },
        userId: { value: userId },
      }),
    register: (roomId, userId, role) =>
      CabanaApi.post('/testing/register', {
        roomId: { value: roomId },
        userId: { value: userId },
        role,
      }),
  }

  const AccountApi = {
    validateEmail: (email) =>
      CabanaApi.get('/account/register/validate/email', {
        params: { value: email },
      }),
    validateAccessCode: (accessCode) =>
      CabanaApi.get('/account/register/validate/accessCode', {
        params: { value: accessCode },
      }),
  }

  return (
    <CabanaApiContext.Provider
      value={{
        ChatApi,
        PersonalizationApi,
        RoomApi,
        TestApi,
        UserApi,
        AccountApi,
      }}>
      {children}
    </CabanaApiContext.Provider>
  )
}
