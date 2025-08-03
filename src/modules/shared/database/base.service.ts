import { Collection, ObjectId, Filter, UpdateFilter, FindOptions } from 'mongodb';

/**
 * Base service class for database operations
 * Provides common CRUD patterns for all services
 */
export abstract class BaseService<T extends Record<string, any>> {
  protected collection: Collection<T>;

  constructor(collection: Collection<T>) {
    this.collection = collection;
  }

  /**
   * Create a new document
   * @param data - Document data
   * @returns Promise with created document
   */
  async create(data: Omit<T, '_id'>): Promise<T & { _id: ObjectId }> {
    const document = {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as unknown as T;

    const result = await this.collection.insertOne(document as any);
    
    return {
      ...document,
      _id: result.insertedId,
    } as T & { _id: ObjectId };
  }

  /**
   * Find documents by filter
   * @param filter - MongoDB filter
   * @param options - Find options
   * @returns Promise with array of documents
   */
  async find(filter: Filter<T> = {}, options: FindOptions<T> = {}): Promise<T[]> {
    const cursor = this.collection.find(filter, options);
    return cursor.toArray();
  }

  /**
   * Find single document by filter
   * @param filter - MongoDB filter
   * @returns Promise with document or null
   */
  async findOne(filter: Filter<T>): Promise<T | null> {
    return this.collection.findOne(filter);
  }

  /**
   * Find document by ID
   * @param id - Document ID
   * @returns Promise with document or null
   */
  async findById(id: string | ObjectId): Promise<T | null> {
    const objectId = typeof id === 'string' ? new ObjectId(id) : id;
    return this.collection.findOne({ _id: objectId } as Filter<T>);
  }

  /**
   * Update document by ID
   * @param id - Document ID
   * @param update - Update operations
   * @returns Promise with updated document or null
   */
  async updateById(
    id: string | ObjectId, 
    update: UpdateFilter<T>
  ): Promise<T | null> {
    const objectId = typeof id === 'string' ? new ObjectId(id) : id;
    
    // Add updatedAt timestamp
    const updateWithTimestamp = {
      ...update,
      $set: {
        ...update.$set,
        updatedAt: new Date(),
      },
    };

    const result = await this.collection.findOneAndUpdate(
      { _id: objectId } as Filter<T>,
      updateWithTimestamp,
      { returnDocument: 'after' }
    );

    return result.value;
  }

  /**
   * Update multiple documents
   * @param filter - MongoDB filter
   * @param update - Update operations
   * @returns Promise with update result
   */
  async updateMany(filter: Filter<T>, update: UpdateFilter<T>) {
    const updateWithTimestamp = {
      ...update,
      $set: {
        ...update.$set,
        updatedAt: new Date(),
      },
    };

    return this.collection.updateMany(filter, updateWithTimestamp);
  }

  /**
   * Delete document by ID
   * @param id - Document ID
   * @returns Promise with deletion result
   */
  async deleteById(id: string | ObjectId): Promise<boolean> {
    const objectId = typeof id === 'string' ? new ObjectId(id) : id;
    const result = await this.collection.deleteOne({ _id: objectId } as Filter<T>);
    return result.deletedCount > 0;
  }

  /**
   * Delete multiple documents
   * @param filter - MongoDB filter
   * @returns Promise with deletion result
   */
  async deleteMany(filter: Filter<T>) {
    return this.collection.deleteMany(filter);
  }

  /**
   * Count documents matching filter
   * @param filter - MongoDB filter
   * @returns Promise with count
   */
  async count(filter: Filter<T> = {}): Promise<number> {
    return this.collection.countDocuments(filter);
  }

  /**
   * Check if document exists
   * @param filter - MongoDB filter
   * @returns Promise with boolean
   */
  async exists(filter: Filter<T>): Promise<boolean> {
    const count = await this.collection.countDocuments(filter, { limit: 1 });
    return count > 0;
  }

  /**
   * Get paginated results
   * @param filter - MongoDB filter
   * @param page - Page number (1-based)
   * @param limit - Items per page
   * @param sort - Sort options
   * @returns Promise with paginated results
   */
  async paginate(
    filter: Filter<T> = {},
    page: number = 1,
    limit: number = 10,
    sort: Record<string, 1 | -1> = { createdAt: -1 }
  ) {
    const skip = (page - 1) * limit;
    
    const [data, total] = await Promise.all([
      this.collection
        .find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .toArray(),
      this.collection.countDocuments(filter),
    ]);

    return {
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page * limit < total,
        hasPrevPage: page > 1,
      },
    };
  }
}