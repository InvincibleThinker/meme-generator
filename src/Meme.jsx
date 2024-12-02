
import React from 'react';

export default function Meme() {

  const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg" 
  })
const [allMemes, setAllMemes] = React.useState([])
    
    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemes(data.data.memes))
    }, [])
    
    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }))
        
    }
    

  function handleChange(event) {
    const {name, value} = event.target;
    setMeme(pre => ({
      ...pre,
      [name]: value
    }))
    
  }
  
  return (
    <main>
      <div className='form'>
        <input type='text'
          name='topText'
          value={meme.topText}
          onChange={handleChange}
          placeholder="top text"
          className='form--inputs'/>
        <input type='text'
          name='bottomText'
          value={meme.bottomText}
          onChange={handleChange}
          placeholder="bottom text"
          className='form--inputs'/>
        <button className='form--button'
          onClick={getMemeImage}>
          Get new meme
        </button>
      </div>
      <div className="meme">
                  <img src={meme.randomImage} 
                    className="meme--image" />
                  <h2 className="meme--text top">
                    {meme.topText}
                  </h2>
                  <h2 className="meme--text bottom">
                    {meme.bottomText}
                  </h2>
      </div>
    </main>
  )
  
}