import React, { useState } from 'react';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Link from '@mui/joy/Link';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';

const ArticleBox = ({ title, content, author }) => {
  const [showModal, setShowModal] = useState(false);
  const [editedArticle, setEditedArticle] = useState({
    title,
    content,
    author,
  });

  const handleChange = (e) => {
    setEditedArticle({ ...editedArticle, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(false);
  };

  const handleDelete = () => {};

  return (
    <div className="bg-white shadow-md rounded-lg mt-4 overflow-hidden">
    <Box sx={{ minHeight: 350 }}>
    <Card
      variant="outlined"
      sx={(theme) => ({
        width: 300,
        gridColumn: 'span 2',
        flexDirection: 'row',
        flexWrap: 'wrap',
        resize: 'horizontal',
        overflow: 'hidden',
        gap: 'clamp(0px, (100% - 360px + 32px) * 999, 16px)',
        transition: 'transform 0.3s, border 0.3s',
        '&:hover': {
          borderColor: theme.vars.palette.primary.outlinedHoverBorder,
          transform: 'translateY(-2px)',
        },
        '& > *': { minWidth: 'clamp(0px, (360px - 100%) * 999,100%)' },
      })}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          paddingBottom: '56.25%', // 16:9 aspect ratio
          overflow: 'hidden',
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1492305175278-3b3afaa2f31f?auto=format&fit=crop&w=2000"
          loading="lazy"
          alt=""
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 200 }}>
        <Box sx={{ display: 'flex' }}>
          <div>
            <Typography level="title-lg">
              <Link
                href="#container-responsive"
                overlay
                underline="none"
                sx={{
                  color: 'text.primary',
                  '&.Mui-focusVisible:after': { outlineOffset: '-4px' },
                }}
              >
                {title}
              </Link>
            </Typography>
            <Typography level="body-sm">{author}</Typography>
          </div>
          <IconButton
            size="sm"
            variant="plain"
            color="neutral"
            sx={{ ml: 'auto', alignSelf: 'flex-start' }}
          >
            <FavoriteBorderRoundedIcon color="danger" />
          </IconButton>
        </Box>
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            paddingBottom: '56.25%', // 16:9 aspect ratio
            overflow: 'hidden',
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1492305175278-3b3afaa2f31f?auto=format&fit=crop&w=2262"
            loading="lazy"
            alt=""
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </Box>
        <Box sx={{ display: 'flex', gap: 1.5, mt: 'auto' }}>
          <Avatar variant="soft" color="neutral">
            {author[0].toUpperCase()}
          </Avatar>
          <div>
            <Typography level="body-xs">Author</Typography>
            <Typography level="body-sm">{author}</Typography>
          </div>
        </Box>
      </Box>
    </Card>
  </Box>
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="w-full">
                      <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Title
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={editedArticle.title}
                        onChange={handleChange}
                        className="form-input rounded-md shadow-sm block w-full p-3 border-[#e6e1e1] border-[1px]"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label
                      htmlFor="content"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Content
                    </label>
                    <textarea
                      id="content"
                      name="content"
                      value={editedArticle.content}
                      onChange={handleChange}
                      className="form-textarea rounded-md shadow-sm block w-full p-3 border-[#e6e1e1] border-[1px]"
                      rows="4"
                    ></textarea>
                  </div>
                  <div className="mt-4">
                    <label
                      htmlFor="author"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Author
                    </label>
                    <input
                      id="author"
                      name="author"
                      value={editedArticle.author}
                      onChange={handleChange}
                      className="form-input rounded-md shadow-sm block w-full p-3 border-[#e6e1e1] border-[1px]"
                    />
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleBox;
