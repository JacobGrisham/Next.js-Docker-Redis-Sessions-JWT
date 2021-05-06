import React from 'react';
import Link from 'next/link';
import 'tachyons';

const Navigation = ({ onRouteChange, isSignedIn }) => {
    if (isSignedIn) {
      return (
        <nav style={{display: 'flex', justifyContent: 'space-between'}}>
          <Link href="/">
            <p className='f3 link dim white underline pa3 pointer'>Home</p>
          </Link>
          <Link href="/">
            <p onClick={() => onRouteChange('signout')} className='f3 link dim white underline pa3 pointer'>Sign Out</p>
          </Link>
        </nav>
      );
    } else {
      return (
        <nav style={{display: 'flex', justifyContent: 'space-between'}}>
          <Link href="/">
            <p className='f3 link dim white underline pa3 pointer'>Home</p>
          </Link>
          <div style={{display: 'flex', justifyContent: 'flex-end'}}>
            <Link href="/signin">
              <p className='f3 link dim white underline pa3 pointer'>Sign In</p>
            </Link>
            <Link href="/register">
              <p className='f3 link dim white underline pa3 pointer'>Register</p>
            </Link>
          </div>
        </nav>
      );
    }
}

export default Navigation;