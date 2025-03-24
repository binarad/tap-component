import React from 'react'

export default async function Page({
	params,
}: {
	params: Promise<{ tabId: number }>
}) {
	const { tabId } = await params

	return <div className='flex h-10/12'>Tab: {tabId}</div>
}
