import { EventEmitter } from "eventemitter3"
import electron from 'electron';
const path = require('path');

// 消息类型
const MSG_TYPE_TEXT = 1 // 文本
const MSG_TYPE_IMG = 2 // 图片
const MSG_TYPE_TRANSFER = 3 // 转账
const MSG_TYPE_VOICE = 4 // 语音
const MSG_TYPE_VIDEO = 5 // 视频
const MSG_TYPE_FILE = 6 // 文件
const MSG_TYPE_VIDEO_CALL = 7 // 视频通话
const MSG_TYPE_VOICE_CALL = 8 // 语音通话

// 转账类型
const TRANSFER_PUBLISH = 1 // 发布
const TRANSFER_RECEIVE = 2 // 接收

// 消息来自
const MSG_FROM_SELF = 1
const MSG_FROM_OPPOSITE = 2
const MSG_FROM_SYSTEM = 3

const FILE_TYPE_UNKNOWN = 1
const FILE_TYPE_TEXT = 2
const FILE_TYPE_EXCEL = 3
const FILE_TYPE_WORD = 4
const FILE_TYPE_ZIP = 5
const FILE_TYPE_PDF = 6




const constant = {
  // 消息类型
  MSG_TYPE_TEXT,
  MSG_TYPE_IMG,
  MSG_TYPE_TRANSFER,
  MSG_TYPE_VOICE,
  MSG_TYPE_VIDEO,
  MSG_TYPE_FILE,
  MSG_TYPE_VIDEO_CALL,
  MSG_TYPE_VOICE_CALL,
  // 转账类型
  TRANSFER_PUBLISH,
  TRANSFER_RECEIVE,
  // 消息来自
  MSG_FROM_SELF,
  MSG_FROM_OPPOSITE,
  MSG_FROM_SYSTEM,
  // 文件类型
  FILE_TYPE_UNKNOWN,
  FILE_TYPE_TEXT,
  FILE_TYPE_EXCEL,
  FILE_TYPE_WORD,
  FILE_TYPE_ZIP,
  FILE_TYPE_PDF
}
var cwd = (electron.app || electron.remote.app).getAppPath();
cwd =path.join(cwd,'../../AppData')
export const GlobalEvent= new EventEmitter();
export const defaultCwd= cwd;

export default constant