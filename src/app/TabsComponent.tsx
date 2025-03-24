'use client'
import React, { useEffect, useRef, useState } from 'react'
import { Tab } from './page'
import { useRouter } from 'next/navigation'
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core'
import {
	arrayMove,
	SortableContext,
	verticalListSortingStrategy,
	useSortable,
} from '@dnd-kit/sortable'
import SortableTab from './SortableTab'
import { TabsDropdown } from './TabsDropdown'
import PinnedIcon from '../../public/pinned.svg'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
const initialTabs: Tab[] = [
	{ id: 1, title: 'Tab 1', url: '/tab1', pinned: false },
	{ id: 2, title: 'Tab 2', url: '/tab2', pinned: false },
	{ id: 3, title: 'Tab 3', url: '/tab3', pinned: false },
	{ id: 4, title: 'Tab 4', url: '/tab4', pinned: false },
	{ id: 5, title: 'Tab 5', url: '/tab5', pinned: false },
	{ id: 6, title: 'Tab 6', url: '/tab6', pinned: false },
	{ id: 7, title: 'Tab 7', url: '/tab7', pinned: false },
	{ id: 8, title: 'Tab 8', url: '/tab8', pinned: false },
	{ id: 9, title: 'Tab 9', url: '/tab9', pinned: false },
	{ id: 10, title: 'Tab 10', url: '/tab10', pinned: false },
	{ id: 11, title: 'Tab 11', url: '/tab11', pinned: false },
	{ id: 12, title: 'Tab 12', url: '/tab12', pinned: false },
	{ id: 13, title: 'Tab 13', url: '/tab13', pinned: false },
]

export default function TabsComponent() {
	const router = useRouter()
	const containerRef = useRef<HTMLDivElement | null>(null)
	const [tabs, setTabs] = useState<Tab[]>(initialTabs)
	const [pinnedTabs, setPinnedTabs] = useState<Tab[]>([])
	const [hiddenTabs, setHiddenTabs] = useState<Tab[]>([])
	const [activeTab, setActiveTab] = useState<number>(tabs[0]?.id)

	const handleTabClick = (tabId: number, url: string) => {
		setActiveTab(tabId)
		router.push(url)
	}

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event

		if (active?.id !== over?.id) {
			const oldIndex = tabs.findIndex(tab => tab.id === active.id)
			const newIndex = tabs.findIndex(tab => tab.id === over?.id)
			setTabs(arrayMove(tabs, oldIndex, newIndex))
		}
	}

	const handleCloseTab = (id: number) => {
		setTabs(prevTabs => prevTabs.filter(tab => tab.id != id))
	}

	const handlePinToggle = (id: number) => {
		setTabs(prevTabs =>
			prevTabs.map(tab =>
				tab.id == id ? { ...tab, pinned: !tab.pinned } : tab
			)
		)
	}
	useEffect(() => {
		localStorage.setItem('visible-tabs', JSON.stringify(tabs))
	}, [tabs])

	useEffect(() => {
		const handleResize = () => {
			const container = containerRef.current
			if (!container) return

			const newHiddenTabs: Tab[] = []
			const newVisibleTabs: Tab[] = []
			let totalWidth = 0

			for (const tab of tabs) {
				totalWidth += 140
				if (totalWidth > container.clientWidth - 100) newHiddenTabs.push(tab)
				else newVisibleTabs.push(tab)
			}

			setHiddenTabs(newHiddenTabs)
		}

		handleResize
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [tabs])

	// const { id, title, url, pinned } = props
	return (
		<div
			ref={containerRef}
			className='tabs-container relative flex items-center justify-center overflow-hidden min-h-[72px] w-full z-10 max-h-[120px] h-[150px]'
		>
			<Menu as='div' className='relative inline-block'>
				<div
					id='pinned-menu-button'
					className='flex w-[48px] h-[48px] items-center justify-center hover:*:block'
				>
					<MenuButton
						id='menu-button'
						// className='flex items-center justify-center w-[48px] h-[48px]'
					>
						<Image src={PinnedIcon} alt='pinned icon' width={16} height={16} />
					</MenuButton>
				</div>
				<MenuItems
					transition
					className='flex flex-col p-2 absolute right-0 left-100 z-10 mt-2 w-56 origin-top-left rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in'
				>
					{tabs
						.filter(tab => tab.pinned == true)
						.map(tab => (
							<MenuItem key={tab.id}>
								<Link
									className='hover:bg-gray-300 h-[25px] w-full '
									href={tab.url}
								>
									{tab.title}
								</Link>
							</MenuItem>
						))}
				</MenuItems>
			</Menu>
			{/* <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}> */}
			<SortableContext items={tabs} strategy={verticalListSortingStrategy}>
				<div className='flex flex-row overflow-hidden w-full h-full items-center  '>
					{tabs.map(tab => (
						<SortableTab
							key={tab.id}
							tab={tab}
							active={tab.id === activeTab}
							onClick={() => {
								handleTabClick(tab.id, tab.url)
							}}
							onClose={handleCloseTab}
							onPin={handlePinToggle}
						/>
					))}
				</div>
			</SortableContext>
			{/* </DndContext> */}
			{hiddenTabs.length > 0 && (
				<TabsDropdown hiddenTabs={hiddenTabs} onSelect={handleTabClick} />
			)}
		</div>
	)
}
