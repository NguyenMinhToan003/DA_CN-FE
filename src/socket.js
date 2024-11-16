import { io } from 'socket.io-client'

const URL = 'http://localhost:4040'

export const socket = io.connect(URL)