import { Container } from './components/Container';
import { Logo } from './components/Logo';
import { Menu } from './components/Menu';
import { Footer } from './components/Footer';

import './styles/theme.css';
import './styles/global.css';

import { DefaultInput } from './components/DefaultInput';
import { DefaultInputHash } from './components/DefaultInputHash';

import { DefaultButton } from './components/DefaultButton';
import { PlayCircleIcon } from 'lucide-react';


export function App() {
  return (
    <>
      <Container>
        <Logo />
      </Container>

      <Container>
        <Menu />
      </Container>


      <Container>
        <form className='form' action=''>
          <div className='formRow'>
            <DefaultInput 
            labelText='Mensagem Criptografada' 
            id='meuInput' 
            type='text' 
            placeholder='Digite aqui sua mensagem'
            />
          </div>

          <div className='formRow'>
            <DefaultInputHash 
            id='meuInputHash' 
            type='text' 
            placeholder='Digite aqui o Hash'
            />
          </div>

          <div className='formRow'>
            <p>Mensagem</p>
          </div>

          <div className='formRow'>
            <DefaultButton icon={<PlayCircleIcon />}/>
          </div>
        </form>
      </Container>

      <Container>
        <Footer />
      </Container>
    </>
  );
}

export default App;

