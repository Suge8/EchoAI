import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

// 从 Markdown 内容中提取第一个标题
function extractTitle(content: string): string {
  // 匹配第一个 # 开头的标题行
  const titleMatch = content.match(/^#\s+(.+)$/m);
  return titleMatch ? titleMatch[1] : '系统公告';
}

interface AnnouncementResponse {
  title: string;
  content: string;
}

interface ErrorResponse {
  error: string;
}

export async function GET(
  req: NextApiRequest,
  res: NextApiResponse<AnnouncementResponse | ErrorResponse>
) {
  try {
    // 读取 Markdown 文件
    const filePath = path.join(process.cwd(), 'content/markdown/announcement.md');
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // 从内容中提取标题
    const title = extractTitle(content);
    
    return res.status(200).json({
      title,
      content,
    });
  } catch (error) {
    console.error('Failed to read announcement:', error);
    return res.status(500).json({ error: 'Failed to load announcement' });
  }
} 