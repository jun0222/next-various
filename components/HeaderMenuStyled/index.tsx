import React, { useState } from 'react'
import styled from 'styled-components'

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  color: #fff;
  padding: 10px 20px;
`

const NavLink = styled.a`
  color: white;
  text-decoration: none;
  margin-right: 20px;
  outline: none;

  &:hover,
  &:focus {
    text-decoration: underline;
  }
`

const MenuContainer = styled.div`
  position: relative;
  display: inline-block;
`

const DropdownMenu = styled.div`
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 12px 16px;
  z-index: 1;

  ${MenuContainer}:hover &,
  ${MenuContainer}:focus-within & {
    display: block;
  }

  & a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;

    &:hover,
    &:focus {
      background-color: #f1f1f1;
    }
  }
`

const HeaderMenuStyled: React.FC = () => {
  return (
    <Header>
      <div>My Website</div>
      <div>
        <NavLink href="#simple-link">Simple Link</NavLink>
        <MenuContainer>
          <NavLink href="#" aria-haspopup="true" aria-expanded="false">
            Hover for Menu
          </NavLink>
          <DropdownMenu>
            <a href="#" tabIndex={0}>
              Profile
            </a>
            <a href="#" tabIndex={0}>
              My Account
            </a>
            <a href="#" tabIndex={0}>
              Logout
            </a>
          </DropdownMenu>
        </MenuContainer>
      </div>
    </Header>
  )
}

export default HeaderMenuStyled
