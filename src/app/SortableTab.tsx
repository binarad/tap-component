import React, { useState } from 'react'
import { Tab } from './page'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

export default function SortableTab({
	tab,
	active,
	onClick,
	onClose,
	onPin,
}: {
	tab: Tab
	active: boolean
	onClick?: () => void
	onClose?: (id: number) => void
	onPin?: (id: number) => void
}) {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id: tab.id })

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	}
	return (
		<div
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
			className={`p-2 h-[48px] ${
				isDragging
					? 'bg-[#7F858D]'
					: active
					? 'border-t-2 border-t-[#4690E2]'
					: 'bg-[#fff] '
			} cursor-pointer w-[145px] flex items-center justify-center gap-3`}
			onClick={onClick}
		>
			{tab.title}
			<button
				onClick={e => {
					e.stopPropagation()
					onClose!(tab.id)
				}}
				className='flex hover:bg-red-500 rounded-full w-[20px] h-[20px]  items-center justify-center '
			>
				✕
			</button>
			<button
				onClick={e => {
					e.stopPropagation()
					onPin!(tab.id)
				}}
				className='flex hover:bg-gray-300 hover:cursor-pointer rounded-full w-[20px] h-[20px]  items-center justify-center '
			>
				📌
			</button>
		</div>
	)
}
