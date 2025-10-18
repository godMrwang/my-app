// app/api/dog/route.ts
export async function GET() {
  // 调用外部 API
  const res = await fetch("https://dog.ceo/api/breeds/image/random");
  const data = await res.json();

  // 返回给前端
  return Response.json({
    success: true,
    image: data.message, // 只返回图片链接
  });
}