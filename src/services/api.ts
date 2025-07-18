import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://adminserver.wingzimpex.com/api';
const ADMIN_BASE_URL = 'https://admin.wingzimpex.com';

// Create and export an Axios instance for API calls
export const api = axios.create({
  baseURL: API_BASE_URL,
});

// Utility function to get full image URL
export const getImageUrl = (imagePath: string | undefined, type: 'products' | 'services' = 'products'): string | null => {
  if (!imagePath) return null;
  
  if (imagePath.startsWith('http')) {
    return imagePath;
  } else if (imagePath.startsWith('/uploads/')) {
    return `${ADMIN_BASE_URL}${imagePath}`;
  } else {
    return `${ADMIN_BASE_URL}/uploads/${type}/${imagePath}`;
  }
};

export interface Product {
  _id: string;
  title: string;
  description: string;
  featuredImage?: string;
  gallery?: string[];
  createdAt: string;
  updatedAt: string;
  category?: string;
  brand?: string;
  subCategory?: string; // <-- add this line
}

export interface Blog {
  _id: string;
  title: string;
  content: string;
  status: 'draft' | 'published';
  slug: string;
  featuredImage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Brand {
  _id: string;
  name: string;
  image?: string;
  description?: string;
}

export interface Category {
  _id: string;
  name: string;
  image?: string;
  description?: string;
  parent?: string | null; // Add parent field for parent-child relationship
  slug?: string; // Add slug for URL-friendly identifiers
}

export interface Sector {
  _id: string;
  title: string;
  description: string;
  featuredImage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  _id: string;
  title: string;
  description: string;
  featuredImage?: string;
  createdAt: string;
  updatedAt?: string;
  // Add other fields as needed
}

// Utility function to generate slug
function generateSlug(title: string, id: string): string {
  const cleanTitle = title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
  
  return `${cleanTitle}-${id}`;
}

// Products API
export const productsApi = {
  getAll: async (): Promise<Product[]> => {
    try {
      const response = await api.get('/products');
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  },

  getById: async (id: string): Promise<Product | null> => {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product:', error);
      return null;
    }
  },

  getByCategory: async (categoryId: string): Promise<Product[]> => {
    try {
      const response = await api.get(`/products/category/${categoryId}`);
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error('Error fetching products by category:', error);
      return [];
    }
  },

  getBySubcategory: async (subcategoryId: string): Promise<Product[]> => {
    try {
      const response = await api.get(`/products/subcategory/${subcategoryId}`);
      if (Array.isArray(response.data)) return response.data;
      if (response.data && Array.isArray(response.data.products)) return response.data.products;
      return [];
    } catch (error) {
      console.error('Error fetching products by subcategory:', error);
      return [];
    }
  },

  getByBrand: async (brandId: string): Promise<Product[]> => {
    try {
      const response = await api.get(`/products/query?brand=${brandId}`);
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error('Error fetching products by brand:', error);
      return [];
    }
  },

  query: async (params: { category?: string; subCategory?: string; brand?: string }): Promise<Product[]> => {
    try {
      const query = new URLSearchParams(params as any).toString();
      const response = await api.get(`/products/query?${query}`);
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error('Error querying products:', error);
      return [];
    }
  },

  getBySlug: async (slug: string): Promise<Product | null> => {
    try {
      // Extract ID from slug
      const parts = slug.split('-');
      const id = parts[parts.length - 1];
      // Fetch by ID
      const response = await api.get(`/products/${id}`);
      const product = response.data;
      // Verify the slug matches
      const expectedSlug = generateSlug(product.title, product._id);
      if (slug !== expectedSlug) {
        return null; // Slug doesn't match, return null
      }
      return product;
    } catch (error) {
      console.error('Error fetching product by slug:', error);
      return null;
    }
  },

  generateSlug: (title: string, id: string): string => {
    return generateSlug(title, id);
  }
};

// Blogs API
export const blogsApi = {
  getAll: async (): Promise<Blog[]> => {
    try {
      const response = await api.get('/blogs');
      return Array.isArray(response.data) ? response.data.filter(blog => blog.status === 'published') : [];
    } catch (error) {
      console.error('Error fetching blogs:', error);
      return [];
    }
  },

  getBySlug: async (slug: string): Promise<Blog | null> => {
    try {
      const response = await api.get(`/blogs/${slug}`);
      const blog = response.data;
      return blog.status === 'published' ? blog : null;
    } catch (error) {
      console.error('Error fetching blog:', error);
      return null;
    }
  }
}; 

export const updatesApi = blogsApi;

export const brandsApi = {
  getAll: async (): Promise<Brand[]> => {
    try {
      const response = await api.get('/brands');
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error('Error fetching brands:', error);
      return [];
    }
  },
};

export const categoriesApi = {
  getAll: async (): Promise<Category[]> => {
    try {
      const response = await api.get('/categories');
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  },

  getNested: async (): Promise<Category[]> => {
    try {
      const response = await api.get('/categories/nested');
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error('Error fetching nested categories:', error);
      return [];
    }
  },
}; 

export const sectorsApi = {
  getAll: async (): Promise<Sector[]> => {
    try {
      const response = await api.get('/sectors');
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error('Error fetching sectors:', error);
      return [];
    }
  },
  getBySlug: async (slug: string): Promise<Sector | null> => {
    try {
      // Extract ID from slug
      const parts = slug.split('-');
      const id = parts[parts.length - 1];
      const response = await api.get(`/sectors/${id}`);
      const sector = response.data;
      // Optionally verify slug matches
      const expectedSlug = generateSlug(sector.title, sector._id);
      if (slug !== expectedSlug) {
        return null;
      }
      return sector;
    } catch (error) {
      console.error('Error fetching sector by slug:', error);
      return null;
    }
  },
  generateSlug: (title: string, id: string): string => {
    return generateSlug(title, id);
  }
};

export const servicesApi = {
  getAll: async (): Promise<Service[]> => {
    try {
      const response = await api.get('/services');
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error('Error fetching services:', error);
      return [];
    }
  },
  generateSlug: (title: string, id: string): string => {
    return generateSlug(title, id);
  }
}; 

export const subcategoryApi = {
  getAll: async (): Promise<Category[]> => {
    try {
      const response = await api.get('/subcategories');
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error('Error fetching subcategories:', error);
      return [];
    }
  },
  getNested: async (parentId: string): Promise<Category[]> => {
    try {
      const response = await api.get(`/subcategories/nested?parentId=${parentId}`);
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error('Error fetching nested subcategories:', error);
      return [];
    }
  },
}; 