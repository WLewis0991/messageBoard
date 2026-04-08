interface HeaderProps {
  onAddClick: () => void;
}


export default function Header({ onAddClick }: HeaderProps) {

    return (<>
      <header>
        <h1>📋 TheMessageBoard</h1>
        <p>A place to share thoughts and ask questions</p>
        <br />
        <button onClick={onAddClick}>Add Post</button>
      </header>
    
    </>)
};