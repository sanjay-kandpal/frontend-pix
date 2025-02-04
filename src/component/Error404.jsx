import React from 'react';

const Error404 = () => {
    const styles = {
        page_404: {
            position: 'absolute',
            left: '30%',
            height: '90vh',
            padding: '40px 0',
            background: '#fff',
            fontFamily: 'Arvo, serif'
        },
        four_zero_four_bg: {
            backgroundImage: 'url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)',
            height: '350px',
            backgroundPosition: 'center'
        },
        h1: {
            fontSize: '80px'
        },
        h3: {
            fontSize: '80px'
        },
        link_404: {
            color: '#fff',
            padding: '10px 20px',
            background: '#39ac31',
            margin: '20px 0',
            display: 'inline-block'
        },
        contant_box_404: {
            marginTop: '-50px'
        }
    };

    return (
        <section style={styles.page_404}>
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="col-sm-10 col-sm-offset-1 text-center">
                            <div style={styles.four_zero_four_bg}>
                                <h1 style={styles.h1}>Error 404</h1>
                            </div>
                            <div style={styles.contant_box_404}>
                                <h3 style={styles.h3}>
                                    Looks like you're lost
                                </h3>
                                <p>The page you are looking for is not available!</p>
                                <a href="/" style={styles.link_404}>Go to Home</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Error404;
