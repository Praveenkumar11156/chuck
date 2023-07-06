import React from "react"
import axios from "axios"

import Chuck from "../assets/chuck.png"

export default function Body() {
  const [category, setCategory] = React.useState([])
  const [currentCategory, setCurrentCategory] = React.useState("")
  const [currentJoke, setCurrentJoke] = React.useState("Click that button...")

  const getJoke = () => {
    if (currentCategory === "") {
      axios.get("https://api.chucknorris.io/jokes/random").then((res) => {
        setCurrentJoke(res.data.value)
      })
    } else {
      axios
        .get(
          `https://api.chucknorris.io/jokes/random?category=${currentCategory}`
        )
        .then((res) => {
          setCurrentJoke(res.data.value)
        })
    }
  }

  React.useEffect(() => {
    axios.get("https://api.chucknorris.io/jokes/categories").then((res) => {
      setCategory(res.data)
    })
  }, [])
  return (
    <div className="body-wrapper">
      <img className="body-img" src={Chuck} alt="chuck norris" />
      <div className="body-joke-area">{currentJoke}</div>
      <div className="body-button-wrapper">
        <button className="body-joke-button" onClick={getJoke}>
          Get Joke
        </button>
      </div>
      <div className="body-radio-wrapper">
        {category.map((cat) => {
          return (
            <div className="body-radio-button">
              <input
                type="radio"
                name="radio"
                value={cat}
                id={cat}
                onClick={() => setCurrentCategory(cat)}
              />
              <label htmlFor={cat}>{cat}</label>
            </div>
          )
        })}
      </div>
    </div>
  )
}
