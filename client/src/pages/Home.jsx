import React, { Component } from 'react'
import { Loader, Card, FormField } from '../components';
import { useState } from 'react';
import { useEffect } from 'react';

// Render Cards is a Component to render cards
const RenderCards = ({ data, title }) => {
    if (data?.length > 0) {
      return (
        data.map((post) => <Card key={post._id} {...post} />)
      );
    }
  
    return (
      <h2 className="mt-5 font-bold text-[#6469ff] text-xl uppercase">{title}</h2>
    );
  };

const Home = () => {
    const [loading, setLoading] = useState(false);
    const [allPosts, setAllPosts] = useState('');
    const [searchText, setSearchText] = useState('');
    const [searchedResults, setSearchedResults] = useState(null);
    const [searchTimeOut, setSearchTimeOut] = useState(null);

    useEffect(() => {
        // Once the home page is loaded retreive the posts from the database and assign the data
        // to the allPosts which then will be used for displaying the different posts at home
        const fetchPosts = async () => {
            setLoading(true);

            try {
                const response = await fetch('http://localhost:8080/api/v1/post', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })

                console.log(response)

                if (response.ok) {
                    const result = await response.json();
                    console.log(result);
                    setAllPosts(result.data.reverse()); // reverse to show the latest one first
                }
            }
            catch (error) {
                alert(error)
            }
            finally {
                setLoading(false);
            }
        }

        fetchPosts();
    }, [])

    // To search through the Post
    const handleSearchChange=(e)=>{
        clearTimeout(searchTimeOut);

        setSearchText(e.target.value);
        
        setSearchTimeOut(
            setTimeout(()=>{
                const searchResults = allPosts.filter((item)=> item.name.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase()));
                setSearchedResults(searchResults)
            },500)
        )
    }

    return (
        <section className='max-w-7xl mx-auto '>

            <div>
                <h1 className='font-extrabold text-[#222328] text-[32px]'>The Community Showcase </h1>
                <p className='mt-2 text-[#666e75] text-[16px] max-w[500px]'> Browse through the Collection of Stunning and Beyond the Imagination images created using this App by AI. </p>
            </div>

            <div className='mt-16'>
                <FormField 
                LabelName="Search Posts"
                type="text"
                name="text"
                placeholder="Search posts"
                value={searchText}
                handleChange={handleSearchChange}
                />
            </div>

            <div className='mt-10'>
                {
                    loading ? (
                        <div className='flex justify-center items-center'>
                            {/* // loads the loading like animation */}
                            <Loader />
                        </div>
                    ) :

                        (
                            <>
                                {searchText && (

                                    <h2 className='font-medium text-[#666e75] text-xl mb-3'>
                                        Showing Results for <span className='text-[#222328]'>
                                            {searchText}
                                        </span>
                                    </h2>

                                )}

                                {/* Make grid for image showcase */}
                                <div className='grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3'>

                                    {searchText ? (
                                        <RenderCards
                                            data={searchedResults} 
                                            title='no search results found'
                                        />


                                    ) :
                                        (
                                            <RenderCards
                                                data={allPosts}
                                                title="No posts found"
                                            />
                                        )
                                    }
                                </div>

                            </>
                        )}

            </div>

        </section>

    )
}

export default Home