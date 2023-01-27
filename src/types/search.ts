import { type } from "os";

/**搜尋歌詞列表 Request DTO */
export interface SearchLyrcisDto {
	artist: string;
	title: string;
}

/**搜尋歌詞列表 Response Item DTO */
export interface SearchLyricsItemResponseDto extends SearchLyrcisDto {
	id: number;
	lyricsUrl: string;
	lyricsID: string;
	lyricsShort: string;
}

/**搜尋歌詞列表 Response List DTO */
export type SearchLyricsListResponseDto = SearchLyricsItemResponseDto[];

/**歌詞爬蟲 Response DTO */
export interface SearchLyricsContentResponseDto extends SearchLyrcisDto {
	artist: string;
	title: string;
	lyricsID: string;
	lyrcisUrl: string;
	lyricsContent: string;
}

interface ThumbnailDto {
    url: string;
    width: number;
    height:number;
}

interface SnippetDto {
    channelId :string;
    channelTitle: string;
    description: string;
    liveBroadcastContent:string;
    publishTime:string;
    publishedAt:string;
    thumbnails: {
        default: ThumbnailDto;
        high:ThumbnailDto;
        medium : ThumbnailDto;
    }
    title:string;
}

export interface YouTubeSearchListResponseItemDto {
    etag: string;
    id : {
        kind:string;
        videoId : string;
    }
    kind: string;
    snippet: SnippetDto;
}

/**
 * @deprecated use "@googleapis/youtube" instead
 */
export interface YouTubeSearchListResponseDto {
    kind : string;
    etag : string;
    nextPageToken:string;
    prevPageToken:string;
    regionCode:string;
    pageInfo: {
        totalResults:number;
        resultsPerPage:number;
    }
    items: YouTubeSearchListResponseItemDto[];
}