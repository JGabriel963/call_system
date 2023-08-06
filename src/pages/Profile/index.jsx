import Header from '../../components/Header'
import Title from '../../components/Title'
import './profile.css'
import { FiSettings, FiUpload } from 'react-icons/fi'
import avatarImg from '../../assets/avatar.png'
import { AuthContext } from '../../contexts/auth'
import { useContext, useState } from 'react'

export default function Profile() {
    const { user } = useContext(AuthContext)
    const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl)


    return (
        <div>
            <Header />

            <div className='content'>
                <Title name="Minha Conta" >
                    <FiSettings size={25} />
                </Title>

                <div className="container">

                    <form onSubmit={e => e.preventDefault()} className='form-profile'>

                        <label className='label-avatar'>
                            <span>
                                <FiUpload color='#fff' size={25} />
                            </span>

                            <input type="file" accept='image/*' /> <br />
                            {avatarUrl === null ? (
                                <img src={avatarImg} alt="profile" width={250} height={250} />
                            ) : (
                                <img src={user.avatarUrl} alt="profile" width={250} height={250} />
                            )}
                        </label>

                        <label>Nome</label>
                        <input type="text" placeholder='Seu nome' />

                        <label>Email</label>
                        <input type="text" placeholder='teste@teste.com' disabled={true} />

                        <button>Salvar</button>
                    </form>

                </div>

                    <div className='container'>
                        <button className='btn__logout'>Sair</button>
                    </div>
                    
            </div>
        </div>
    )
}