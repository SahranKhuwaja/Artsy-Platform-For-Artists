import avatar from '../../assets/img/default-avatar.png';

const Users = (props) => {


    return (
        <div className="darkCard">
                <div className="flex">
                    <div>
                        <img className="avatar-small mg5" alt="avatar" src={props.user.DP !== undefined ? `data:image/png;base64,${Buffer.from(props.user.DP).toString('base64')}` : avatar} />
                    </div>
                    <div className='mgLeft5'>
                        <h5 className="bold mg0">{props.user.FirstName} {props.user.LastName} (You)</h5>
                        <p className='mg0 bolder'>Online</p>
                    </div>
                </div>
            
        </div>
    )
}

export default Users;