import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router} from 'react-router-dom'
import { AuthProvider } from './context/auth.context.jsx'
import { UserDataProvider } from './context/userData.context.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
<React.StrictMode>
  <Router>
      <UserDataProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </UserDataProvider>
    </Router>
</React.StrictMode>
)

