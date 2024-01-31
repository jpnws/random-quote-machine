import { useEffect, useState } from 'react';

import QuoteBox from './QuoteBox';

export default function App() {
  const [image, setImage] = useState({ loading: false, imageUrl: '' });

  const [quote, setQuote] = useState({
    loading: false,
    quote: '',
    author: '',
  });

  const handleGetNewQuote = async () => {
    try {
      setQuote({ ...quote, loading: true });
      setTimeout(async () => {
        const resp = await fetch('https://api.quotable.io/random');
        const data = await resp.json();
        setQuote({ loading: false, quote: data.content, author: data.author });
      }, 1000);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getImage = async () => {
      try {
        setImage((image) => {
          return { ...image, loading: true };
        });
        const resp = await fetch('https://picsum.photos/2840/2160?blur=1');
        setImage((image) => {
          return { ...image, loading: false, imageUrl: resp.url };
        });
      } catch (error) {
        console.error(error);
      }
    };

    const getQuote = async () => {
      try {
        setQuote((quote) => {
          return {
            ...quote,
            loading: true,
          };
        });
        setTimeout(async () => {
          const resp = await fetch('https://api.quotable.io/random');
          const data = await resp.json();
          setQuote({
            loading: false,
            quote: data.content,
            author: data.author,
          });
        }, 1000);
      } catch (error) {
        console.error(error);
      }
    };

    getImage();
    getQuote();
  }, []);

  let style;
  if (image.imageUrl) {
    style = {
      background: `url(${image.imageUrl})`,
    };
  }

  return (
    <div
      style={style}
      className="quote-container"
    >
      <div
        className="quote-box"
        id="quote-box"
      >
        <QuoteBox quote={quote} />
        <div className="quote-box-bottom">
          <a
            className="button"
            id="tweet-quote"
            title="Tweet this quote!"
            target="_blank"
            rel="noreferrer"
            href={
              !quote.loading
                ? `https://twitter.com/intent/tweet?hashtags=quotes&text=${encodeURIComponent(
                    `${quote.quote}\n-${quote.author}`
                  )}`
                : ''
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              fill="#fff"
            >
              <path d="M24 4.3c-.898.4-1.8.7-2.8.802 1-.602 1.8-1.602 2.198-2.704-1 .602-2 1-3.097 1.204C19.3 2.602 18 2 16.6 2A4.907 4.907 0 0 0 11.7 6.898c0 .403 0 .801.102 1.102-4.102-.2-7.7-2.102-10.102-5.102C1.2 3.602 1 4.5 1 5.398c0 1.704.898 3.204 2.2 4.102-.802-.102-1.598-.3-2.2-.602V9c0 2.398 1.7 4.398 3.898 4.8-.398.098-.796.2-1.296.2-.301 0-.602 0-.903-.102.602 2 2.403 3.403 4.602 3.403-1.7 1.3-3.801 2.097-6.102 2.097-.398 0-.8 0-1.199-.097C2.2 20.699 4.8 21.5 7.5 21.5c9.102 0 14-7.5 14-14v-.602c1-.699 1.8-1.597 2.5-2.597" />
            </svg>
          </a>
          <button
            className="quote-button"
            id="new-quote"
            onClick={handleGetNewQuote}
          >
            New Quote
          </button>
        </div>
      </div>
    </div>
  );
}
