// ===============================
// LOCAL USER MEDIA CONFIG
// ===============================

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

export const USER_PHOTOS = [
  "00cc6b29-4a90-47ef-9b91-dcc751c9d67e.JPG",
  "095b4b8b-82d8-4411-b221-6b1fe2e7baaf.JPG",
  "0a4ac079-7907-4d40-a209-85e5e8730d86.JPG",
  "26f287fa-3e37-4861-b08c-09b7f741a615.JPG",
  "3d8058ae-755d-48cc-8def-3a47f77993f7.JPG",
  "6055ffb4-7836-4caf-af10-5365af773424.JPG",
  "6f045382-b41d-4acd-a3ef-5d30b3748087.JPG",
  "7059cf75-f8f5-417d-b93f-732a9d9d2d3d.JPG",
  "836a8925-b617-4dbb-b459-658bcd383799.JPG",
  "99f4aa0a-c232-4b0a-90f8-84a33d9ba235.JPG",
  "IMG_7387.JPG",
  "IMG_7395.JPG",
  "IMG_7396.JPG",
  "IMG_7400.JPG",
  "IMG_7411.JPG",
  "IMG_7412.JPG",
  "IMG_7429.JPG",
  "IMG_7430.JPG",
  "IMG_7431.JPG",
  "IMG_7432.JPG",
  "aa3fd46b-93c9-4564-8ac4-6bde0f953b49.JPG",
  "b45bc2f7-2695-46bc-9109-29141db56094.JPG",
  "cd1bf1f7-6039-45a4-b323-346ef329033b.JPG",
  "cefe689f-73b5-423e-89cc-9cc4ce3004bd.JPG"
];

export const USER_VIDEOS = [
  "1926D9AB-A05C-4042-9623-8BAB9043643D.MOV",
  "41D3C323-3722-408F-81CD-8A462C6AE855.MOV",
  "44B2EC9C-E357-4F58-889A-5D74B9878FFD.MP4",
  "57BDC44E-2A6D-41EC-B44E-0EB5D218BCF8.MP4",
  "5E86B3CC-785F-437E-BD49-4C778F50F39F.MOV",
  "70953B17-D743-4069-902C-2B6B95EB4EFC.MOV",
  "76036D63-2E67-474F-BD03-84C35E1199DB.MP4",
  "78A39C5A-2D07-4BF0-BE5C-BB8B4DE0797A.MOV",
  "86540D5E-E9AB-4395-AA7E-8E7C60B62956.MP4",
  "8E49923E-CBD4-4D5C-BA29-A8F0306B0888.MOV",
  "93787B65-40B0-40E3-92AB-581B898CD2EE.MP4",
  "9E6F9B68-8995-4258-84C4-0404D45A3F6C.MP4",
  "E057379E-1B60-4D3A-AB49-3E9B8711D634.MOV"
];

export type MediaItem = {
  id: string;
  type: 'photo' | 'video';
  src: string;
};

// Interleave photos and videos in balanced ratio
const photoItems: MediaItem[] = USER_PHOTOS.map((file, idx) => ({
  id: `photo-${idx}`,
  type: 'photo' as const,
  src: `${BASE_PATH}/media/${file}`
}));

const videoItems: MediaItem[] = USER_VIDEOS.map((file, idx) => ({
  id: `video-${idx}`,
  type: 'video' as const,
  src: `${BASE_PATH}/media/${file}`
}));

// Alternating pattern: 2 photos, 1 video...
const buildBalancedMediaList = (): MediaItem[] => {
  const result: MediaItem[] = [];
  let p = 0;
  let v = 0;
  while (p < photoItems.length || v < videoItems.length) {
    if (p < photoItems.length) result.push(photoItems[p++]);
    if (p < photoItems.length) result.push(photoItems[p++]);
    if (v < videoItems.length) result.push(videoItems[v++]);
  }
  return result;
};

export const ALL_MEDIA = buildBalancedMediaList();


// ===============================
// DATE CONFIG
// ===============================

export const TARGET_DATE = new Date("2026-10-04T00:00:00");

// ===============================
// MOON DATA (UNCHANGED)
// ===============================

export const MOON_DATA = [
  { year: "2005", src: "https://github.com/navneetty-netizen/moon1/blob/main/moon-2005.png?raw=true" },
  { year: "2015", src: "https://github.com/navneetty-netizen/moon1/blob/main/moon-2015.png?raw=true" },
  { year: "2021", src: "https://github.com/navneetty-netizen/moon1/blob/main/moon-2021.png?raw=true" },
  { year: "2024", src: "https://github.com/navneetty-netizen/moon1/blob/main/moon-2024.png?raw=true" },
  { year: "2025", src: "https://github.com/navneetty-netizen/moon1/blob/main/moon-2025.png?raw=true" },
  { year: "2026", src: "https://github.com/navneetty-netizen/moon1/blob/main/moon-2026.png?raw=true" }
];
