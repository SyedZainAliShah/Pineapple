import React from 'react';
import Menu from './Menu';
import '../styles.css'

const Layout = ({title = "Title",description="Description",className, children}) => 
<body>
<div>
    <Menu />
    <div className="jumbotron">
            
    <h2 className="title1">{title}</h2>
    <div>
        <p  className="lead">{description}</p>
    </div>
    </div> 
    <div className={className}>{children}</div>
</div>

</body>

export default Layout;