import React from 'react'
import { Container, Logo, LogoutBtn } from './../index'
import { Link } from 'react-router'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

function Header() {

  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Home',
      path: '/',
      status: true
    },
    {
      name: 'Login',
      path: '/login',
      status: !authStatus
    },
    {
      name: 'Signup',
      path: '/signup',
      status: !authStatus
    },
    {
      name: 'All Posts',
      path: '/all-post',
      status: authStatus
    },
    {
      name: 'Add Post',
      path: '/add-post',
      status: authStatus
    }
  ]

  return (
    <header className='py-3 shadow bg-gray-500'>
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo width='100px' />
            </Link>
          </div>
          <ul className='flex ml-auto'>
            {
              navItems.map((item) =>
                item.status ? (
                  <li key={item.name}>
                    <button onClick={() => navigate(item.path)}
                      className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                    >
                      {item.name}
                    </button>
                  </li>
                ) : null
              )
            }
            {
              authStatus && (
                <li>
                  <LogoutBtn />
                </li>
              )
            }
          </ul>

        </nav>
      </Container>
    </header>
  )
}

export default Header