'use client'
import { useState } from 'react'
import TabsComponent from './TabsComponent'

export interface Tab {
	id: number
	title: string
	url: string
	pinned: boolean
}

export default function Home() {
	const [title, setTitle] = useState<string>('')

	return (
		<div>
			<input
				className='border rounded w-2xs h-10'
				type='text'
				onChange={event => {
					event.preventDefault()
					setTitle(event.target.value)
				}}
			/>

			<button
				className='bg-gray-400 border rounded w-3xs h-10'
				onClick={() => {}}
			>
				Enter
			</button>

			<button
				className='bg-red-300 border rounded w-3xs h-10'
				onClick={() => {
					var localdata = JSON.parse(localStorage.getItem('tabs') as string)
					console.log(localdata)
				}}
			>
				Log
			</button>
		</div>
	)
}
