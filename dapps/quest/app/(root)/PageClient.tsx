'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useContext } from 'react';
// import Blog from '../../artifacts/contracts/Blog.sol/Blog.json';
import { AccountContext } from '@/context';
import { ownerAddress } from '@/utils/blogContract';
import { useRouter } from 'next/router';
import type { Blog } from '../../typechain-types/Blog';

export default function PageClient(props: any) {
  const account = useContext(AccountContext);
  const router = useRouter();

  const navigate = async () => {
    router.push('/create-post');
  };

  return (
    <div>
      <div className='postList'>
        {
          /* map over post */
          props.posts.map((post: Blog.PostStruct, idx: any) => (
            <Link href={`/post/${post.id}`} key={idx}>
              <div className='linkStyle'>
                <p className='postTitle'>{post.title}</p>
                <div className='arrowContainer'>
                  <Image
                    src={'/right-arrow.svg'}
                    alt='right arrrow'
                    className='smallArrow'
                  />
                </div>
              </div>
            </Link>
          ))
        }
      </div>
      <div className='container'>
        {account == ownerAddress && props.posts && !props.posts.length && (
          // if signed in user is accout owner, render a button to create first post
          <button className='buttonStyle' onClick={navigate}>
            Create Post
            <Image
              src={'/right-arrow.svg'}
              alt='Right arrow'
              className='arrow'
            />
          </button>
        )}
      </div>
    </div>
  );
}
