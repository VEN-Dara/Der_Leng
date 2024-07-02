import { Col, Row, List, Comment, Rate, Spin } from "antd"
import { useEffect, useState } from "react"
import { getReview } from "../../../hooks/Product/useReviewFetcher"
import { Link, useParams } from "react-router-dom"
import defaultProfile from "@/app/static/img/default_img/derleng-default-profile.png"
import { formatDate } from '../../../utility/format-function/date'

const Review = () => {
	const [state, setState] = useState({
		data: [],
		isLoading: true,
		next: null,
		message: null,
		page: 1,
	})

	const package_id = useParams().id;

	useEffect(() => {
		getReview(setState, package_id)
	}, [])

	const handleGetMoreReview = () => {
		getReview(setState, package_id, state.page)
	}

	return (
		<>
			<Row gutter={30}>
				<Col xs={24}>
					<div className="bg-white dark:bg-white10 m-0 p-0 text-theme-gray dark:text-white60 text-[15px] mb-[25px] rounded-10 relative">
						<div className="h-[60px] px-[25px] text-dark dark:text-white87 font-medium text-[17px] border-regular dark:border-white10 border-b">
							<h1 className="mb-0 inline-block py-[16px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold">
								Reviews
							</h1>
						</div>
						{state.isLoading ?
							(
								<div className="spin flex items-center justify-center">
									<Spin />
								</div>
							) :
							(
								<div className="px-[25px]">
									<List
										className="comment-list"
										// header={`2 replies`}
										itemLayout="horizontal"
										dataSource={state.data}
										renderItem={(item) => (
											<li>
												<Comment
													author={item.user.fullname}
													avatar={item.user.profile_image ? item.user.profile_image : defaultProfile}
													content={(
														<>
															<Rate
																className="relative -top-[2px] flex items-center ltr:[&>li]:mr-0.5 rtl:[&>li]:ml-0.5 [&>li.ant-rate-star-zero>div>div>span>svg]:text-[#c6d0dc]"
																allowHalf
																defaultValue={item.rating}
																disabled
															/>
															<p className="text-black dark:text-white">{item.comment}</p>
														</>
													)}
													datetime={formatDate(item.created_at)}
												/>
											</li>
										)}
									/>
									{
										state.next && <button onClick={() => {handleGetMoreReview()}} className="text-primary hover:text-green-400 hover:underline">See more...</button>
									}
								</div>

							)
						}
					</div>
				</Col>
			</Row>
		</>
	)
}

export default Review