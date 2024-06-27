import React from 'react';
import NewChapter from '../Modals/NewChapter';
import { forOwn } from 'lodash';
import { DropdownToggle, DropdownItem, DropdownMenu, UncontrolledDropdown, Button } from 'reactstrap';
import url from '../../assets/data/url';
import axios from 'axios';
import moment from 'moment';
import { Link } from 'react-router-dom';
import book from '../../assets/img/book.png';
import ChangeCover from '../Modals/ChangeCover';

axios.defaults.withCredentials = true;


class ProfileBooklet extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            NewChapterModal: false,
            Step: 1,
            Chapter: {
                Values: {
                    Title: '',
                    Description: '',
                    CoverImage: -1,
                    UploadedImages: [],
                },
                Errors: {
                    Title: '',
                    Description: '',
                    CoverImage: '',
                    UploadedImages: '',
                },

            },
            ArtistBooklet: [],
            Edit: false,
            NewAddedImages: [],
            EditChapterId: '',
            ChangeCoverImageModal: false
        }
    }

    upload = undefined;

    componentDidMount = () => {
        this.getArtistBooklet();
    }

    getArtistBooklet = async () => {
        const request = await axios.get(`${url}artistBooklet/get`);
        if (request.data.artistBooklet) {
            this.setState({
                ArtistBooklet: request.data.artistBooklet
            })

        }
    }

    toggleNewChapterModal = () => {
        this.setState({
            NewChapterModal: !this.state.NewChapterModal
        })
    }

    toggleChangeCoverImageModal = () => {
        this.setState({
            ChangeCoverImageModal: !this.state.ChangeCoverImageModal
        })
    }

    clearNewChapter = () => {
        this.setState({
            Step: 1,
            Chapter: {
                Values: {
                    Title: '',
                    Description: '',
                    CoverImage: -1,
                    UploadedImages: [],

                },
                Errors: {
                    Title: '',
                    Description: '',
                    CoverImage: '',
                    UploadedImages: [],
                },
            },
            Edit: false,
            NewAddedImages: [],
            EditChapterId: '',
        })
    }

    cancelNewChapter = () => {
        this.clearNewChapter();
        this.toggleNewChapterModal();
    }

    cancelChangeCover = () => {
        this.clearNewChapter();
        this.toggleChangeCoverImageModal();
    }

    nextStep = async () => {
        if (await this.validate()) {
            this.setState({
                Step: this.state.Step + 1
            })
        }
        if (this.state.Step === 3 && this.state.Edit === true) {
            this.saveBooklet()
        }
        if (this.state.Step === 4 && this.state.Edit === false) {
            this.saveBooklet()
        }
    }

    prevStep = () => {
        this.setState({
            Step: this.state.Step - 1,
        })
    }

    onChangeTitle = (input) => {
        let Chapter = { ...this.state.Chapter }
        Chapter.Values.Title = input.target.value;
        this.setState({
            Chapter
        })
    }

    onChangeDescription = (input) => {
        let Chapter = { ...this.state.Chapter }
        Chapter.Values.Description = input.target.value;
        this.setState({
            Chapter
        })
    }

    linkUpload = (input) => {
        this.upload = input;
    }

    triggerUpload = () => {
        this.upload.click();
    }

    displayUploadedImages = async (event) => {
        const { Chapter, Edit } = this.state;
        const images = [...event.target.files];

        for (let i = 0; i < images.length; i++) {
            const check = this.validateImages(images[i].name.split('.')[1]);
            if (!check) {
                this.setState({
                    Chapter: { Values: Chapter.Values, Errors: { ...Chapter.Errors, UploadedImages: 'Please upload images only!' } }
                })
                this.upload.value = "";
                return false;
            }
        }
        if (Edit) {
            this.setState({
                Chapter: {
                    Values: { ...Chapter.Values }, Errors: { ...Chapter.Errors, UploadedImages: '' }
                },
                NewAddedImages: images,
                Edit: true
            })

        } else {
            this.setState({
                Chapter: { Values: { ...Chapter.Values, UploadedImages: images }, Errors: { ...Chapter.Errors, UploadedImages: '' } }
            })
        }


    }

    setCoverImage = (position) => {
        const { Chapter } = this.state;
        this.setState({
            Chapter: { Values: { ...Chapter.Values, CoverImage: Chapter.Values.CoverImage !== position ? position : -1 }, Errors: { ...Chapter.Errors, CoverImage: '' } }
        })
    }

    saveBooklet = async () => {

        if (this.state.Edit === true) {
            const { NewAddedImages, Chapter, EditChapterId } = this.state;
            const ArtistBooklet = [...this.state.ArtistBooklet]
            const imagesArray = [...NewAddedImages];
            const fd = new FormData();
            for (let i = 0; i < imagesArray.length; i++) {
                fd.append('Image', imagesArray[i])
            }
            fd.append('Title', Chapter.Values.Title);
            fd.append('Description', Chapter.Values.Description);
            fd.append('CoverImage', Chapter.Values.CoverImage);
            this.cancelNewChapter();
            const request = await axios.put(`${url}artistBooklet/update/${EditChapterId}`, fd);
            if (request.data.artistBooklet) {
                const index = ArtistBooklet.findIndex(e => e._id.toString() === EditChapterId.toString());
                ArtistBooklet[index] = request.data.artistBooklet;
                this.setState({
                    ArtistBooklet,
                    Edit: false,
                    EditChapterId: ''
                })
            }

        } else {
            //Insert Code
            const Chapter = { ...this.state.Chapter.Values }
            const imagesArray = [...Chapter.UploadedImages];
            const fd = new FormData();
            for (let i = 0; i < imagesArray.length; i++) {
                fd.append('Image', imagesArray[i])
            }
            fd.append('Title', Chapter.Title);
            fd.append('Description', Chapter.Description);
            fd.append('CoverImage', Chapter.CoverImage);
            this.cancelNewChapter();
            const request = await axios.post(`${url}artistBooklet/insert`, fd);
            if (request.data.artistBooklet) {
                this.setState({
                    ArtistBooklet: [request.data.artistBooklet, ...this.state.ArtistBooklet]
                })
            }
        }
    }

    deleteBooklet = async (id, index) => {
        const ArtistBooklet = [...this.state.ArtistBooklet];
        const request = await axios.delete(`${url}artistBooklet/delete/${id}`);
        if (request) {
            ArtistBooklet.splice(index, 1);
            this.setState({
                ArtistBooklet
            })
        }
    }

    validate = async () => {
        const { Chapter, Step } = this.state;
        let Errors = { ...Chapter.Errors }
        if (Step === 1) {
            await forOwn(Chapter.Values, (value, key) => {
                if (key !== 'Tags' || key !== 'UploadedImages') {
                    if (value === '') {
                        Errors[key] = `${key} is required!`;
                    } else {
                        Errors[key] = '';
                    }
                }
            })

            this.setState({
                Chapter: { Values: Chapter.Values, Errors: Errors }
            })
            if (Errors.Title !== '' || Errors.Description !== '') {
                return false;
            }
            return true;
        }
        else if (Step === 2) {
            if (Chapter.Values.UploadedImages.length === 0) {
                this.setState({
                    Chapter: { Values: Chapter.Values, Errors: { ...Chapter.Errors, UploadedImages: 'Please upload images!' } }
                })
                return false
            }
            this.setState({
                Chapter: { Values: Chapter.Values, Errors: { ...Chapter.Errors, UploadedImages: '' } }
            })
            return true;
        }
        else if (Step === 3) {
            if (Chapter.Values.CoverImage === -1) {
                this.setState({
                    Chapter: { Values: Chapter.Values, Errors: { ...Chapter.Errors, CoverImage: 'Please select the cover image!' } }
                })
                return false;
            }
            this.setState({
                Chapter: { Values: Chapter.Values, Errors: { ...Chapter.Errors, CoverImage: '' } }
            });
            return true;
        } else {
            return true;
        }

    }

    validateImages = (split) => {
        if (split === 'jpg' || split === 'jpeg' || split === 'png' || split === 'jfif') {
            return true;
        }
        return false;
    }

    getChapter = async (input) => {
        let Chapter = { ...this.state.Chapter }
        const request = await axios.get(`${url}artistBooklet/getImages/${input._id}?mode=edit`);
        if (request.data.images) {
            Chapter.Values.Title = input.Title
            Chapter.Values.Description = input.Description
            Chapter.Values.UploadedImages = await request.data.images
            this.setState({
                Chapter,
                Edit: true,
                EditChapterId: input._id
            })
        }
    }
    EditChapter = (input) => {
        this.getChapter(input);
        this.toggleNewChapterModal();
    }

    ChangeCoverImage = async (input) => {
        this.getChapter(input);
        this.toggleChangeCoverImageModal();

    }

    updateCoverImage = (position) => {
        const Chapter = { ...this.state.Chapter }
        if (Chapter.Values.UploadedImages[position].CoverImage) {
            const findIndex = Chapter.Values.UploadedImages.findIndex(e => e.CoverImage === true);
            if (findIndex !== -1) {
                Chapter.Values.UploadedImages[findIndex].CoverImage = false;
            }
            Chapter.Values.UploadedImages[position].CoverImage = false

        } else {
            const findIndex = Chapter.Values.UploadedImages.findIndex(e => e.CoverImage === true);
            if (findIndex !== -1) {
                Chapter.Values.UploadedImages[findIndex].CoverImage = false;
            }
            Chapter.Values.UploadedImages[position].CoverImage = true;
        }

        this.setState({
            Chapter
        })
    }

    saveCoverImage = async () => {
        const Chapter = { ...this.state.Chapter }
        const ArtistBooklet = [...this.state.ArtistBooklet]
        const findIndex = Chapter.Values.UploadedImages.findIndex(e => e.CoverImage === true);
        if (findIndex === -1) {
            this.setState({
                Chapter: { Values: Chapter.Values, Errors: { ...Chapter.Errors, CoverImage: 'Please select the cover image!' } }
            })
        } else {

            const findIndex2 = ArtistBooklet.findIndex(e => e._id.toString() === this.state.EditChapterId.toString());
            ArtistBooklet[findIndex2].CoverImage = Chapter.Values.UploadedImages[findIndex];
            this.setState({
                ArtistBooklet
            });
            const request = await axios.post(`${url}artistBooklet/coverImage/update`, { newCover: ArtistBooklet[findIndex2].CoverImage._id });
            if (request.data) {
                this.cancelChangeCover();
            }
        }


    }

    render() {
        let display;
        if (this.state.ArtistBooklet.length > 0) {
            display = (
                <div style={{ width: '100%' }} >
                    {this.state.ArtistBooklet.map((e, i) => (
                        <div style={{ margin: "20px", marginTop: "0px" }} key={e._id} id={e._id}>
                            <div className="row" style={{ backgroundColor: "white", borderRadius: "10px", boxShadow: "0px 0px 20px -4px gray", padding: "20px", margin: "0px 2px" }}>
                                <div className="col-md-6 p0">
                                    <img alt={e.Title + " cover"} className="bookletCover" src={`${url}artistBooklet/image/${e.CoverImage.ImageId}/${e.CoverImage.FileName}`} style={{ objectFit: 'cover', width: '100%' }} />
                                </div>
                                <div className="col-md-6 p0">
                                    <div style={{ float: "right" }}>
                                        <UncontrolledDropdown>
                                            <DropdownToggle aria-expanded={false} aria-haspopup={true} data-toggle="dropdown" id="dropdownMenuLink" onClick={e => e.preventDefault()} style={{ backgroundColor: 'white', color: '#3f414d', border: 'none' }}>
                                                <i className="fa fa-ellipsis-v" style={{ fontSize: "20px" }} />
                                            </DropdownToggle>
                                            <DropdownMenu aria-labelledby="dropdownMenuLink" style={{ position: 'relative', marginTop: '-7px', marginRight: '-35px' }}>
                                                <DropdownItem href="#" onClick={this.EditChapter.bind(this, e)}>
                                                    Edit
                                                    </DropdownItem>
                                                <DropdownItem href="#" onClick={this.ChangeCoverImage.bind(this, e)}>
                                                    Change Cover Image
                                                    </DropdownItem>
                                                <DropdownItem href="#" onClick={this.deleteBooklet.bind(this, e._id, i)}>
                                                    Delete
                                                    </DropdownItem>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>

                                    </div>
                                    <div className="bookletDetails left-150">
                                        <p style={{whiteSpace:'nowrap'}}><Link to={`/Booklet/${e._id}`} className="blue bolder">{moment(e.createdAt).fromNow()}</Link></p>
                                        <h5 className="darkGray bolder">{e.Title}</h5>
                                        <div><p className="lightGray bolder">{e.Description}</p></div>
                                        <br />
                                        <div className="row" style={{ position: 'absolute', bottom: 0, width: '100%', marginBottom: '10px' }}>
                                            <p className="col"><Link to={`/Booklet/${e._id}`} className="blue bolder">See Details<i className="fa fa-angle-right" /></Link></p>
                                            <p className="col lightGray bolder alignRight"><i className="fa fa-comment-o" /> 7 comments</p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )
        }

        else {
            display = (
                <div style={{ width: "100%" }} >
                    <div style={{ textAlign: 'center', backgroundColor: "white", borderRadius: "10px", boxShadow: "0px 0px 20px -4px gray", padding: "20px", margin: "0px 20px 20px 20px" }}>
                        <p className="darkGray bolder mg0">Your Art Booklet is empty</p>
                        <img alt="Booklet is empty" src={book} style={{ width: "150px", margin: "20px" }} />
                        <p className="darkGray bolder">Showcase your amazing talent today by starting a new chapter</p>
                    </div>
                </div>
            )
        }

        return (
            <>
                <NewChapter
                    NewChapterModal={this.state.NewChapterModal}
                    cancelNewChapter={this.cancelNewChapter}
                    Step={this.state.Step}
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    {...this.state.Chapter}
                    onChangeTitle={this.onChangeTitle}
                    onChangeDescription={this.onChangeDescription}
                    linkUpload={this.linkUpload}
                    triggerUpload={this.triggerUpload}
                    displayUploadedImages={this.displayUploadedImages}
                    setCoverImage={this.setCoverImage}
                    Edit={this.state.Edit}
                    NewAddedImages={this.state.NewAddedImages}
                />
                <ChangeCover
                    ChangeCoverImageModal={this.state.ChangeCoverImageModal}
                    cancelNewChapter={this.cancelNewChapter}
                    {...this.state.Chapter}
                    linkUpload={this.linkUpload}
                    triggerUpload={this.triggerUpload}
                    displayUploadedImages={this.displayUploadedImages}
                    updateCoverImage={this.updateCoverImage}
                    cancelChangeCover={this.cancelChangeCover}
                    saveCoverImage={this.saveCoverImage}
                />

                <div style={{ display: "flex"}}>
                    <div>
                        <div style={{ backgroundColor: "white", borderRadius: "10px", boxShadow: "0px 0px 20px -4px gray", padding: "20px", margin: "0px 0px 20px 20px" }}>
                            <Button onClick={this.toggleNewChapterModal} style={{ width: "210px" }} color="info"><b>Start A New Chapter</b></Button>
                            <hr />
                            {this.state.ArtistBooklet.map(e => (
                                <div className="chapterName"><a href={`#${e._id}`}><p className="bolder mg0">{e.Title}</p></a></div>
                            ))
                            }
                        </div>
                    </div>
                    {display}
                </div>
            </>
        )
    }
}

export default ProfileBooklet;