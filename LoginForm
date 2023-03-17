import {
  Alert,
  Box,
  Button,
  Divider,
  FormControl,
  Heading,
  Text,
  VStack,
} from 'native-base'
import { useState } from 'react'
import { useAuthContext } from '../../providers/AuthProvider'
import FormInput from '../_shared/form/FormInput'
import FormRightLabel from '../_shared/form/FormRightLabel'
import KeyboardDismissOverlay from '../_shared/layout/KeyboardDismissOverlay'
import TextLink from '../_shared/text/TextLink'

const LoginForm = ({}) => {
  const { login } = useAuthContext()

  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loginError, setLoginError] = useState('')

  const emailValidation = () =>
    new Promise((resolve, reject) => {
      if (email.match(/\S+@\S+\.\S+/)) resolve(null)
      else
        reject(
          'Uh oh - a valid email address requires an @ followed by the domain.'
        )
    })

  const doLogin = async () => {
    setLoading(true)
    setLoginError('')
    await login({ email, password })
      .then(
        () => {},
        (error) => {
          setLoginError(error.response.data.error)
        }
      )
      .finally(() => setLoading(false))
  }

  return (
    <KeyboardDismissOverlay>
      <VStack h="100%" w="100%">
        <Heading textAlign="center">Log in to your account</Heading>
        <Text mt="3" textAlign="center">
          Don't have one? <TextLink href="Signup">Create an account</TextLink>
        </Text>
        <VStack mt="7" space={3}>
          <FormControl>
            <FormInput
              label="Email"
              defaultValue={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              validation={emailValidation}
              autofocus
            />
            <FormInput
              label="Password"
              defaultValue={password}
              onChangeText={setPassword}
              type={showPassword ? 'text' : 'password'}
              rightLabel={
                <FormRightLabel
                  iconName={showPassword ? 'eye-slash' : 'eye'}
                  handlePress={() => setShowPassword(!showPassword)}>
                  {showPassword ? 'Hide' : 'Show'}
                </FormRightLabel>
              }
            />
          </FormControl>
          <Button
            mt={2}
            onPress={doLogin}
            isDisabled={!email}
            isLoading={loading}>
            Log in
          </Button>
          {loginError !== '' && (
            <Alert colorScheme="error" variant="subtle">
              <Text w="100%" color="text.900">
                {loginError}
              </Text>
            </Alert>
          )}
          <Box
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            my="3">
            <Divider
              borderWidth="0.5px"
              borderColor="muted.500"
              my="2"
              width="40%"
            />
            <Text fontSize="16px" color="muted.500">
              OR
            </Text>
            <Divider
              borderWidth="0.5px"
              borderColor="muted.500"
              my="2"
              width="40%"
            />
          </Box>
          <Button variant="outline">Continue with Ochsner SSO</Button>
          <Text mt="3" textAlign="center">
            <TextLink href="ForgotPassword">Forgot your password?</TextLink>
          </Text>
        </VStack>
      </VStack>
    </KeyboardDismissOverlay>
  )
}

export default LoginForm
