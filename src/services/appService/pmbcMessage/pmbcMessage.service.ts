import axios, { AxiosError } from 'axios';
import instance from '../../axios';
import { BaseService } from '../baseService';
import { PmbcMessageDetail } from '.';
import { Observable } from 'rxjs';

export class PmbcMessageService extends BaseService {
	private static instance: PmbcMessageService;

	private constructor() {
		super();
	}

	public static getInstance(): PmbcMessageService {
		if (!PmbcMessageService.instance) {
			PmbcMessageService.instance = new PmbcMessageService();
		}
		return PmbcMessageService.instance;
	}

	getListChat() {
		return this.postData('/pmbcchat/getall', null);
	}

	createChat(newChat: PmbcMessageDetail, chatMember: number[]) {
		return this.postData('/pmbcchat/createnewchat', {
			...newChat,
			chatMember: chatMember,
		});
	}
	createGroupChat(newChat: PmbcMessageDetail, listChatMemberDTO: any[]) {
		return this.postData('/pmbcchat/createGroupChat', {
			...newChat,
			// chatMember: chatMember,
			listChatMemberDTO: listChatMemberDTO,
		});
	}

	openChat(gid: number, pageIndex: number, pageSize: number): Promise<any> {
		return this.postData('/pmbcchat/openChat', {
			gid: gid,
			pageIndex: pageIndex,
			pageSize: pageSize,
		});
	}
	openChatDaoNguoc(
		gid: number,
		pageIndex: number,
		pageSize: number
	): Promise<any> {
		return this.postData('/pmbcchat/openChatDaoNguoc', {
			gid: gid,
			pageIndex: pageIndex,
			pageSize: pageSize,
		});
	}
	sendMessage(newChat: PmbcMessageDetail, chatId: number) {
		return this.postData('/pmbcchat/sendMessage', {
			...newChat,
			chatId: chatId,
		});
	}

	getNewBoxChat(chatId: number) {
		return this.postData('/pmbcchat/getNewBoxChat', { gid: chatId });
	}

	ghimStatus(gid: number) {
		return this.postData('/pmbcchat/ghimStatus', { gid: gid });
	}
	unGhimStatus(gid: number) {
		return this.postData('/pmbcchat/unGhimStatus', { gid: gid });
	}

	muteNoti(gid: number) {
		return this.postData('/pmbcchat/muteNoti', { gid: gid });
	}
	unMuteNoti(gid: number) {
		return this.postData('/pmbcchat/unMuteNoti', { gid: gid });
	}

	listImageChatSelect(
		gid: number,
		pageIndex2: number,
		pageSize: number
	): Promise<any> {
		return this.postData('/pmbcchat/listImageChatSelect', {
			gid: gid,
			pageIndex: pageIndex2,
			pageSize: pageSize,
		});
	}

	listFileChatSelect(
		gid: number,
		pageIndex3: number,
		pageSize: number
	): Promise<any> {
		return this.postData('/pmbcchat/listFileChatSelect', {
			gid: gid,
			pageIndex: pageIndex3,
			pageSize: pageSize,
		});
	}
	openListMember(gid: number): Promise<any> {
		return this.postData('/pmbcchat/openListMember', { gid: gid });
	}

	getChatBoxCss(gid: number) {
		return this.postData('/pmbcchat/getChatBoxCss', { gid: gid });
	}

	createChatBoxCss(
		chatId: number,
		bg_image_url: string,
		bg_user_chat: string,
		text_color: string
	) {
		return this.postData('/pmbcchat/createChatBoxCss', {
			chat_id: chatId,
			bg_image_url: bg_image_url,
			bg_user_chat: bg_user_chat,
			text_color: text_color,
		});
	}

	changeTextColorChatBox(chatId: number, text_color: string) {
		return this.postData('/pmbcchat/changeChatBoxTextColor', {
			chat_id: chatId,
			text_color: text_color,
		});
	}

	changeSoundNotiChatBox(chatId: number, sound_noti: string) {
		return this.postData('/pmbcchat/changeSoundNotiChatBox', {
			chat_id: chatId,
			sound_noti: sound_noti,
		});
	}

	leaveBoxChat(gid: number) {
		return this.postData('/pmbcchat/leaveBoxChat', { gid: gid });
	}

	deleteBoxChat(gid: number, typeDelete: string) {
		return this.postData('/pmbcchat/deleteBoxChat', {
			gid: gid,
			typeDelete: typeDelete,
		});
	}

	addMember(chatIdOnSelect: number, listChatMemberDTO: any[]) {
		return this.postData('/pmbcchat/addMember', {
			// chatMember: chatMember,
			listChatMemberDTO: listChatMemberDTO,
			gid: chatIdOnSelect,
		});
	}

	deleteChatContent(gid: number) {
		return this.postData('/pmbcchat/deleteChatContent', { gid: gid });
	}

	doLike(gid: number, type: number) {
		return this.postData('/pmbcchat/doLike', { gid: gid, type: type });
	}

	getOneByChatId(gid: number) {
		return this.postData('/pmbcchat/getOneByChatId', { gid: gid });
	}
}
