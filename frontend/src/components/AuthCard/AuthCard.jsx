import "./AuthCard.css"

const AuthCard = ({children}) => {
  return (
    <div className='container'>
        <div className='box'>
            {children}
        </div>
      
    </div>
  )
}

export default AuthCard
