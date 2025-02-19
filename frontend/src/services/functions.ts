import axios, { type AxiosResponse } from "axios";
import readTimeFunction from "./readTimeFunction";
import queryString from "query-string";

interface Post {
  id?: number;
  content: string;
  postTags: Tag[];
  summary: string;
  read_time: string;
  titulo: string;
  image: string;
  author: Author;
  status?: string;
}

interface Tag {
  id: number;
  tag?: string;
}
interface Author {
  id: number;
  name?: string;
  image?: string;
}

export async function postPost(
  content: string,
  postTags: number[],
  summary: string,
  titulo: string,
  image: string,
  author: number,
  status?: string
): Promise<void> {
  const time = readTimeFunction(content);
  const url: string = "https://directus-10-10-4-p3ab.onrender.com/items/posts";
  const tags: Tag[] = postTags.map((id) => ({ id }));
  const authorFormatted = { id: author };
  const data: Post = {
    content,
    postTags: tags,
    summary,
    read_time: time.toString(),
    titulo,
    image,
    author: authorFormatted,
    status,
  };

  try {
    const response: AxiosResponse<Post> = await axios.post(url, data);
  } catch (error) {
    console.error("There was a problem with your Axios request:", error);
  }
}

export async function updatePost(
  postId: number,
  content: string,
  postTags: number[],
  summary: string,
  titulo: string,
  image: string,
  author: number,
  status?: string
): Promise<void> {
  const time = readTimeFunction(content);
  const url: string = `https://directus-10-10-4-p3ab.onrender.com/items/posts/${postId}`;
  const tags: Tag[] = postTags.map((id) => ({ id }));
  const authorFormatted = { id: author };
  const data: Post = {
    content,
    postTags: tags,
    summary,
    read_time: time.toString(),
    titulo,
    image,
    author: authorFormatted,
    status,
  };

  try {
    const response: AxiosResponse<Post> = await axios.patch(url, data);
  } catch (error) {
    console.error("There was a problem with your Axios request:", error);
  }
}

interface Filter {
  tags: number[];
  author: number[];
  query: string;
  // Agrega aquí cualquier otra propiedad que necesites para los filtros
}

export async function getPosts(filters: Filter): Promise<Post[]> {
  let url: string =
    "https://directus-10-10-4-p3ab.onrender.com/items/posts?fields=*.*,postTags.tags_id.*&filter[status][_eq]=published";

  filters.tags.forEach((filter, index) => {
    const tagsFilter: string = `&filter[_and][0][_or][${index}][postTags][tags_id][_in]=${filter}`;
    url += tagsFilter;
  });

  filters.author.forEach((filter, index) => {
    const authorFiler: string = `&filter[_and][1][_or][${index}][author][id]=${filter}`;
    url += authorFiler;
  });

  if (filters.query.length > 0) {
    const titleFilter = `&filter[_and][2][_or][0][titulo][_icontains]=${filters.query}`;
    const summaryFilter = `&filter[_and][2][_or][1][summary][_icontains]=${filters.query}`;
    const contentFilter = `&filter[_and][2][_or][2][content][_icontains]=${filters.query}`;
    const authorFilter = `&filter[_and][2][_or][3][author][name][_icontains]=${filters.query}`;

    const finalFilter =
      titleFilter + summaryFilter + contentFilter + authorFilter;
    url += finalFilter;
  }
  try {
    const response: AxiosResponse<{ data: Post[] }> = await axios.get(url);
    console.log("Posts retrieved successfully:", response.data);
    response.data.data.forEach((post) => {
      console.log(post.postTags);
    });
    return response.data.data;
  } catch (error) {
    console.error("There was a problem with your Axios request:", error);
    throw error;
  }
}

export async function getSinglePost(postId: number): Promise<Post> {
  try {
    const url: string = `https://directus-10-10-4-p3ab.onrender.com/items/posts/${postId}?fields=*.*`;
    const response: AxiosResponse<Post> = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("There was a problem with your Axios request:", error);
    throw error;
  }
}
export async function getHeroContent(): Promise<{
  title: string;
  subtitle: string;
}> {
  try {
    const url = "https://directus-10-10-4-p3ab.onrender.com/items/hero";
    const response = await axios.get(url);
    return response.data.data;
  } catch (error) {
    throw error;
  }
}

export async function getFeaturedPosts(filters: Filter): Promise<Post[]> {
  let url: string =
    "https://directus-10-10-4-p3ab.onrender.com/items/posts?fields=*.*,postTags.tags_id.*&filter[featured][_eq]=true";
  filters.tags.forEach((filter, index) => {
    const tagsFilter: string = `&filter[_and][0][_or][${index}][postTags][tags_id][_in]=${filter}`;
    url += tagsFilter;
  });

  try {
    const response: AxiosResponse<{ data: Post[] }> = await axios.get(url);
    return response.data.data;
  } catch (error) {
    console.error("There was a problem with your Axios request:", error);
    throw error;
  }
}

export async function getTags(): Promise<Tag[]> {
  const url: string = "https://directus-10-10-4-p3ab.onrender.com/items/tags";
  try {
    const response: AxiosResponse<{ data: Tag[] }> = await axios.get(url);
    return response.data.data;
  } catch (error) {
    console.error("There was a problem with your Axios request:", error);
    throw error;
  }
}

export async function getAuthors(): Promise<Author[]> {
  const url: string =
    "https://directus-10-10-4-p3ab.onrender.com/items/authors";
  try {
    const response: AxiosResponse<{ data: Author[] }> = await axios.get(url);
    return response.data.data;
  } catch (error) {
    console.error("There was a problem with your Axios request:", error);
    throw error;
  }
}

export async function getFeaturedAuthors(): Promise<Author[]> {
  const url: string =
    "https://directus-10-10-4-p3ab.onrender.com/items/authors?filter[featured][_eq]=true";
  try {
    const response: AxiosResponse<{ data: Author[] }> = await axios.get(url);
    return response.data.data;
  } catch (error) {
    console.error("There was a problem with your Axios request:", error);
    throw error;
  }
}
