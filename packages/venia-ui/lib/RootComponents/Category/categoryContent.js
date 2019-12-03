import React, { Fragment, Suspense } from 'react';
import { shape, string } from 'prop-types';

import { useCategoryContent } from '@magento/peregrine/lib/talons/RootComponents/Category';

import { mergeClasses } from '../../classify';
import { Title } from '../../components/Head';
import Breadcrumbs from '../../components/Breadcrumbs';
import Gallery from '../../components/Gallery';
import Pagination from '../../components/Pagination';
import defaultClasses from './category.css';
import { Button } from '@ampersandhq/amp-css';
import ReactFredhopperRecommendedItems from '@ampersandhq/react-fredhopper-recommended-products';

const FilterModal = React.lazy(() => import('../../components/FilterModal'));

const CategoryContent = props => {
    const { data, pageControl } = props;

    console.log(data);

    
    const newItems = data.products.items.map(item => (
        {
            secondid: item.id,
            _imageurl: item.small_image.url,
            final_price_formatted: item.price.regularPrice.amount.value,
            vg_url_key: `/${item.url_key}`,
            product_name: item.name,
        }
    ));

    const talonProps = useCategoryContent({ data });

    const {
        categoryId,
        categoryName,
        filters,
        handleLoadFilters,
        handleOpenFilters,
        items,
        pageTitle
    } = talonProps;

    const classes = mergeClasses(defaultClasses, props.classes);

    const header = filters ? (
        <div className={classes.headerButtons}>
            <button
                className={classes.filterButton}
                onClick={handleOpenFilters}
                onFocus={handleLoadFilters}
                onMouseOver={handleLoadFilters}
                type="button"
            >
                {'Filter'}
            </button>
        </div>
    ) : null;

    // If you want to defer the loading of the FilterModal until user interaction
    // (hover, focus, click), simply add the talon's `loadFilters` prop as
    // part of the conditional here.
    const modal = filters ? <FilterModal filters={filters} /> : null;

    return (
        <Fragment>
            <Breadcrumbs categoryId={categoryId} />
            <Title>{pageTitle}</Title>
            <article className={classes.root}>
                <h1 className={classes.title}>
                    <div className={classes.categoryTitle}>{categoryName}</div>
                </h1>
                {header}
                <section className={classes.gallery}>
                    <Gallery items={items} />
                </section>
                <div className={classes.pagination}>
                    <Pagination pageControl={pageControl} />
                </div>
                <Suspense fallback={null}>{modal}</Suspense>

                <h2>AMPCSS test</h2>
                <Button
                    as="a"
                    style="primary"
                    size="large"
                    wide
                    additionalClassNames="hello-world"
                >
                    I am a amp css button
                </Button>

                <h2>Recommended products module test</h2>
                <div class="o-region__inner">
                    <div class="o-layout">
                        <div class="o-layout__item u-12/12">
                            <ReactFredhopperRecommendedItems 
                                items={newItems}
                                campaignId={'12345'}
                            />
                        </div>
                    </div>
                </div>

            </article>
        </Fragment>
    );
};

export default CategoryContent;

CategoryContent.propTypes = {
    classes: shape({
        filterContainer: string,
        gallery: string,
        headerButtons: string,
        pagination: string,
        root: string,
        title: string
    })
};
