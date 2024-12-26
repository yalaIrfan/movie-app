import mongoose from 'mongoose';


interface MoviesAttrs {
    title: string;
    genre: string;
    rating: number;
    link: string;
}

interface MovieDoc extends mongoose.Document {
    title: string;
    genre: string;
    rating: number;
    link: string;
}

interface MovieModel extends mongoose.Model<MovieDoc> {
    build(attrs: MoviesAttrs): MovieDoc;
}

const movieSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: function (v: string) {
                    return v.length > 2 && v.length < 100;
                },
                message: 'Title should be between 2 and 100 characters'
            }
        },
        genre: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            required: true,
            default: 1
        },
        link: {
            type: String,
            required: true,
            validate: {
                validator: function (v: string) {
                    return v.length > 0;
                },
                message: 'Link should be a valid URL'
            }
        }
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
            }
        }
    }
);


movieSchema.statics.build = (attrs: MoviesAttrs) => {
    return new Movie(attrs);

};

const Movie = mongoose.model<MovieDoc, MovieModel>('Movie', movieSchema);
export { Movie };