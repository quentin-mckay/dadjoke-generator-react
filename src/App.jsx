import { useState } from 'react'

import smiley from './assets/smiley.png'

const App = () => {
    const [topic, setTopic] = useState('')
    const [joke, setJoke] = useState('')

    const fetchJoke = async (term) => {
        try {
            const response = await fetch(
                `https://icanhazdadjoke.com/search?term=${term}`,
                {
                    headers: {
                        Accept: 'application/json',
                    },
                }
            )
            if (!response.ok) throw new Error('network error')

            const data = await response.json()
            return data.results // returns an array of joke objects
        } catch (err) {
            console.log(err.error)
        }
    }

    const pickRandom = (arr) => {
        const randomIndex = Math.floor(Math.random() * arr.length)
        return arr[randomIndex]
    }

    const generateJoke = async (e) => {
        e.preventDefault()

        const jokesArray = await fetchJoke(topic)

        if (jokesArray.length === 0) {
            setJoke('Sorry, there are no jokes with that topic.')
        } else {
            const joke = pickRandom(jokesArray).joke // joke objects are in the form { id, joke }
            setJoke(joke)
        }
    }

    return (
        <div className='bg-slate-800 h-screen text-white grid place-items-center text-xl'>
            <div className='w-3/4 max-w-3xl p-8 border-2 border-gray-500 rounded-md bg-white/5'>
                <h1 className='text-5xl text-center font-semibold '>
                    Dad Joke Generator
                </h1>
                <form
                    onSubmit={generateJoke}
                    className='mt-8 w-3/4 mx-auto text-center '
                >
                    <div className='flex gap-2 items-center justify-center'>
                        <label htmlFor='topic'>Topic:</label>
                        <input
                            type='text'
                            id='topic'
                            className='px-2 py-1 rounded text-black'
                            placeholder=''
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                        />
                    </div>
                    <button className='w-3/4 border bg-orange-500/10 border-orange-500 px-4 py-2 mt-8 hover:bg-orange-500/30 active:bg-orange-500/60 rounded-md'>
                        {topic
                            ? `Tell me a joke about ${topic}!`
                            : 'Tell me a random joke!'}
                    </button>
                </form>
                <p className='mt-6 max-w-[80%] mx-auto text-2xl font-light'>
                    {joke}
                </p>
                <a
                    href='https://icanhazdadjoke.com/api'
                    target='_blank'
                    className='absolute w-10 h-10 bottom-0 right-0'
                >
                    <img src={smiley} alt='smiley face' />
                </a>
            </div>
        </div>
    )
}
export default App
