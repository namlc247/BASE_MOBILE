import { useCallback, useRef, useState, useEffect } from 'react';
import { PmbcMessageService } from '../services/appService/pmbcMessage';
import FileUtils from '../utils/fileUtils';

export const useChat = () => {
	const [listImage, setListImage] = useState<{ [key: string]: any }>({});
	const [chatList, setChatLists] = useState<any[]>([]);
	const [chatItemSelect, setChatItemSelect] = useState<any>(null);
	const chatItemSelectRef = useRef<any>(null);
	const isScrollToEnd = useRef<boolean>(false);
	const pmbcMessageService = PmbcMessageService.getInstance();

	// Update ref when chatItemSelect changes
	useEffect(() => {
		chatItemSelectRef.current = chatItemSelect;
	}, [chatItemSelect]);

	const handleChat = useCallback(
		(socketData: any) => {
			if (
				socketData &&
				socketData?.chat_id == chatItemSelectRef.current?.gid
			) {
				isScrollToEnd.current = true;
				setChatLists((prev) => [...prev, socketData]);
				FileUtils.loadListImage(
					[socketData],
					'image_user',
					listImage,
					setListImage
				);

				if (socketData.file && socketData.type == 1) {
					FileUtils.loadListImage(
						[socketData],
						'file',
						listImage,
						setListImage
					);
				}
			}
		},
		[listImage]
	);

	return {
		listImage,
		setListImage,
		chatList,
		setChatLists,
		chatItemSelect,
		setChatItemSelect,
		isScrollToEnd,
		handleChat,
	};
};
