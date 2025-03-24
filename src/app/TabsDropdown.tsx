'use client'
import DropDownArrow from '../../public/dropdownarrow.svg'
import { useState } from 'react'
import { Tab } from './page'

interface TabsDropdownProps {
	hiddenTabs: Tab[]
	onSelect: (tabId: number, url: string) => void
}

export function TabsDropdown({ hiddenTabs, onSelect }: TabsDropdownProps) {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<div className='relative'>
			<button
				className='p-2 bg-gray-300 rounded-md hover:cursor-pointer'
				onClick={() => {
					setIsOpen(prev => !prev)
				}}
			>
				More ▼
			</button>

			{isOpen && (
				<div className='absolute right-0 mt-2 w-40 bg-white rouded border-gray-300 border shadow-lg h-36 z-10'>
					{hiddenTabs.map(tab => (
						<div
							key={tab.id}
							className='p-2 hover:bg-gray-200 cursor-pointer z-10'
							onClick={() => {
								onSelect(tab.id, tab.url)
								setIsOpen(false)
							}}
						>
							{tab.title}
						</div>
					))}
				</div>
			)}
		</div>
	)
}
